# Race Plus Plus 技术文档

## 基本功能设计

Race Plus Plus（以下简称RPP）的游戏逻辑十分简单，基本逻辑只有两条：

* 功能方块：当玩家站立在功能方块上时执行配置文件中指定的对应功能
* 赛程任务：当玩家完成整个赛程（或每一圈）时执行配置文件中指定的任务

::: warning
如果不实现下面的高级功能，那么可以使用功能方块来实现赛程任务，但因为RPP实现了高级功能，且使用高级功能来实现赛程任务更方便快捷，故本文不会介绍用功能方块来实现赛程任务的方法
:::

## 功能方块

RPP的功能方块不外乎两大类：

* 效果类
* 弹射类

其中效果类功能方块实现较为简单，只需要在玩家站立在相应功能方块上时给予玩家相应效果即可。

::: tip
要获取玩家站立在的方块，只需要查询玩家的坐标取整后再将y轴减去1后坐标对应的方块类型即可。
但实际上在RPP中我们默认不仅会查询玩家脚下的方块，而且还会在玩家脚下方块并非功能方块时继续查找更靠下的一个方块（这是为了防止漏判），其获取方法同上，只需要将y轴再减去1即可
:::

而弹射类方块实现相对较难，我们的目标是：
* 当玩家站立在弹射类功能方块上时，根据其配置文件中指定的横向力度与纵向力度，将玩家向正前方弹射

::: warning
这里弹射时的方向是玩家的朝向，与配置文件无关
:::

可以发现，这个要求很像是击飞，而击飞实际上就是击退+纵向速度，所以我们开始寻找关于击打（Knock）的关键词。

我们可以找到。这些相关代码：
```java
package net.minecraft.entity;

public abstract class LivingEntity extends Entity {
    //省略了部分方法
    public void takeKnockback(double strength, double x, double z) {
        strength *= 1.0 - this.getAttributeValue(EntityAttributes.GENERIC_KNOCKBACK_RESISTANCE);
        if (!(strength <= 0.0)) {
            this.velocityDirty = true;
            Vec3d vec3d = this.getVelocity();
            Vec3d vec3d2 = (new Vec3d(x, 0.0, z)).normalize().multiply(strength);
            this.setVelocity(vec3d.x / 2.0 - vec3d2.x, this.onGround ? Math.min(0.4, vec3d.y / 2.0 + strength) : vec3d.y, vec3d.z / 2.0 - vec3d2.z);
        }
    }
    //省略了部分方法
    protected void knockDownwards() {
        this.setVelocity(this.getVelocity().add(0.0, -0.03999999910593033, 0.0));
    }
    //省略了部分方法
}
```
分析可以发现，MC的击退，受伤时反重力这些设定都是依靠 Velocity 实现的。

::: warning
这个Velocity实质上是一个三维矢量数据，和ArC使用的代理服务端Velocity不是一个东西
:::

我们可以看到MC已经给我们实现了平面击退的轮子（takeKnockback方法），那么这个轮子怎么用呢？

我们先来看传入的参数：```double strength, double x, double z```

根据名字就能猜出分别是弹射力度，x轴相对力度，z轴相对力度。

我们再来看方法体，可以看到这一行：

```
strength *= 1.0 - this.getAttributeValue(EntityAttributes.GENERIC_KNOCKBACK_RESISTANCE)；
```

代表了根据护甲等信息对弹射力度进行削弱，尽管我们不想要这个设定，但是实际上因为比赛时玩家没有任何能影响到击退抗性的装备，故本处代码不会触发，所以无需对其进行更改。

而后面几行则是对输入的数据进行处理后给玩家设置Velocity，我们不需要完全理解，只需要知道MC已经为我们处理好了这些内容.

但是我们知道的是横向力度与方向，怎么转换为方法的那三个参数呢？
实际上我们只需要对大小为横向力度，方向为玩家方向的这个矢量进行[正交分解](https://baike.baidu.com/item/%E6%AD%A3%E4%BA%A4%E5%88%86%E8%A7%A3/8117005?fr=kg_general)即可。


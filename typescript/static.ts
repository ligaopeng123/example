/**********************************************************************
 *
 * @模块名称: static
 *
 * @模块用途: static
 *
 * @date: 2021/6/24 13:34
 *
 * @版权所有: PGLI
 *
 **********************************************************************/

class StaticClass {
	static age: number  = 4;
	static getAge = ()=> {
		return StaticClass.age;
	}
	
	name = 'test';
	public getName = ()=> {
		return this.name;
	}
}

export default StaticClass;
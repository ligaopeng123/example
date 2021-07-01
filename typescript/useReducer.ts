/**
 * 支持的参数
 */
export enum EnumRulesState {
	rules = 'rules', // rules的配置
	SMS = 'SMS', // 飞书短信等配置
	deveices = 'deveices', // 资产表数据
	users = 'users', // 用户表
	areaId = 'areaId', // 区域
	eventType = 'eventType', // 事件类型
	weekTime = 'weekTime', // 时间类型
}

/**
 * 默认值
 */
const defaultRulse = {
	"name": "",
	"description": "",
	"actions": [],
	"areaId": "",
	"deviceIds": "",
	"eventCode": "",
	"timeTemplateId": ''
};
/**
 * 默认值
 */
export const store = {
	[EnumRulesState.rules]: defaultRulse
};

/**
 * 公共数据共享
 * @param state
 * @param action
 */
export const rulesReducer = (state: any, action: any) => {
	switch (action.type) {
		case EnumRulesState.rules:
			return Object.assign({}, state, {[EnumRulesState.rules]: action.value});
		case EnumRulesState.SMS:
			const value: any = action.value;
			for (let item of value) {
				value[item.key] = item.value;
				value[item.value] = item.key;
			}
			return Object.assign({}, state, {[EnumRulesState.SMS]: value});
		case EnumRulesState.deveices:
			return Object.assign({}, state, {[EnumRulesState.deveices]: action.value});
		case EnumRulesState.users:
			return Object.assign({}, state, {[EnumRulesState.users]: action.value});
		case EnumRulesState.areaId:
			return Object.assign({}, state, {[EnumRulesState.areaId]: action.value});
		case EnumRulesState.eventType:
			return Object.assign({}, state, {[EnumRulesState.eventType]: action.value});
		case EnumRulesState.weekTime:
			return Object.assign({}, state, {[EnumRulesState.weekTime]: action.value});
		default:
			return state;
	}
};

export const initState = (state: any) => {
	let newRules: any;
	if (state[EnumRulesState.rules]) {
		/**
		 * 有一些参数需要特殊处理 此处不能使用循环赋值
		 */
		newRules = {
			[EnumRulesState.rules]: {
				id: state[EnumRulesState.rules].id,
				name: state[EnumRulesState.rules].name,
				description: state[EnumRulesState.rules].description,
				/**
				 * 动作
				 */
				actions: state[EnumRulesState.rules].actions.map((item: any) => {
					return {
						"message": item.message,
						"name": item.name,
						"personIds": item.persons.map((user: any) => user.id).join(','),
						"type": item.type
					}
				}),
				areaId: state[EnumRulesState.rules].areaId,
				/**
				 * 默认参数都是字符串 以','隔开
				 */
				deviceIds: state[EnumRulesState.rules].devices.map((item: any) => item.key).join(','),
				eventCode: state[EnumRulesState.rules].eventCode.code,
				timeTemplateId: state[EnumRulesState.rules].timeTemplateId,
			}
		};
	}
	
	return Object.assign({}, store, state, newRules);
};
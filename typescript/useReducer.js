"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initState = exports.rulesReducer = exports.store = exports.EnumRulesState = void 0;
/**
 * 支持的参数
 */
var EnumRulesState;
(function (EnumRulesState) {
    EnumRulesState["rules"] = "rules";
    EnumRulesState["SMS"] = "SMS";
    EnumRulesState["deveices"] = "deveices";
    EnumRulesState["users"] = "users";
    EnumRulesState["areaId"] = "areaId";
    EnumRulesState["eventType"] = "eventType";
    EnumRulesState["weekTime"] = "weekTime";
})(EnumRulesState = exports.EnumRulesState || (exports.EnumRulesState = {}));
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
exports.store = {
    [EnumRulesState.rules]: defaultRulse
};
/**
 * 公共数据共享
 * @param state
 * @param action
 */
const rulesReducer = (state, action) => {
    switch (action.type) {
        case EnumRulesState.rules:
            return Object.assign({}, state, { [EnumRulesState.rules]: action.value });
        case EnumRulesState.SMS:
            const value = action.value;
            for (let item of value) {
                value[item.key] = item.value;
                value[item.value] = item.key;
            }
            return Object.assign({}, state, { [EnumRulesState.SMS]: value });
        case EnumRulesState.deveices:
            return Object.assign({}, state, { [EnumRulesState.deveices]: action.value });
        case EnumRulesState.users:
            return Object.assign({}, state, { [EnumRulesState.users]: action.value });
        case EnumRulesState.areaId:
            return Object.assign({}, state, { [EnumRulesState.areaId]: action.value });
        case EnumRulesState.eventType:
            return Object.assign({}, state, { [EnumRulesState.eventType]: action.value });
        case EnumRulesState.weekTime:
            return Object.assign({}, state, { [EnumRulesState.weekTime]: action.value });
        default:
            return state;
    }
};
exports.rulesReducer = rulesReducer;
const initState = (state) => {
    let newRules;
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
                actions: state[EnumRulesState.rules].actions.map((item) => {
                    return {
                        "message": item.message,
                        "name": item.name,
                        "personIds": item.persons.map((user) => user.id).join(','),
                        "type": item.type
                    };
                }),
                areaId: state[EnumRulesState.rules].areaId,
                /**
                 * 默认参数都是字符串 以','隔开
                 */
                deviceIds: state[EnumRulesState.rules].devices.map((item) => item.key).join(','),
                eventCode: state[EnumRulesState.rules].eventCode.code,
                timeTemplateId: state[EnumRulesState.rules].timeTemplateId,
            }
        };
    }
    return Object.assign({}, exports.store, state, newRules);
};
exports.initState = initState;
//# sourceMappingURL=useReducer.js.map
export enum tagStatusText {
    success = 1,
    info =2,
    warning = 3,
    danger = 4 
}
export const options = [
    {
      value: 1,
      label: '已完成'
    },
    {
      value: 2,
      label: '已删除'
    },
    {
      value: 3,
      label: '待进行'
    },
    {
      value: 4,
      label: '进行中'
    }
]

export interface DetailData {
    date: string;
    name: string;
    status: number|string;
    describe: string;
}
// 状态文字转换
export const tagText = ( status:number ) => {
    const result = ['','已完成','已删除','待进行','进行中'];
    return result[status];
}
// 状态类型转换
export const tagType = ( status:number ) => {
    return tagStatusText[status]
}
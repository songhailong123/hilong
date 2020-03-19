export enum tagStatusText {
    success = 1,
    info =2,
    warning = 3,
    danger = 4 
}
export const getNowFormatDate = () => {
    const date = new Date();
    const seperator1 = "-";
    const year = date.getFullYear();
    let month:number|string = date.getMonth() + 1;
    let strDate:number|string = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
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
    userName?:string;
    id?:number|string;
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
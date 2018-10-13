export function payStatus(status) {
    if(status.payStatus != '02') {
      switch (status.payStatus) {
        case '01' :
          return '未付款';
        case '03' :
          return '已退款';
      }
    }else {
      switch (status.deliveryStatus) {
        case '01' :
          return '已发货';
        case '02' :
          return '未发货';
        case '03' :
          return '交易完成';
      }
    }
}

export function orderType(status) {
  switch (status.payStatus) {
    case '01' :
      return '购买新机';
    case '02' :
      return '卖旧机';
    case '03' :
      return '换机订单';
  }
}


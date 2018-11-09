export function payStatus(status) {
    switch (status.orderStatus) {
      case '01' :
        return '已完成';
      case '02' :
        return '已取消';
      case '03' :
        return '进行中';
    }
}

export function orderType(status) {
  switch (status.type) {
    case '01' :
      return '购买新机';
    case '02' :
      return '出售旧机';
    case '03' :
      return '换机订单';
  }
}

export function orderLogType(status) {
  switch (status.type) {
    case '01' :
      return '订单待付款';
    case '02' :
      return '订单已付款';
    case '03' :
      return '订单已取消';
    case '04' :
      return '订单已收款';
    case '05' :
      return '订单换购旧机已检验';
  }
}

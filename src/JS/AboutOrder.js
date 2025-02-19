import axios from "axios"
import {
  ElMessage,
  ElMessageBox
} from 'element-plus'

const settleOrder = (user_id, after) => {
  axios({
    method: 'post',
    url: '/order/settle-order/' + user_id
  }).then((res) => {
    ElMessage({
      type: res.data.isSuccess ? 'success' : 'error',
      message: res.data.message,
    });
    after();
  }).catch(console.log("error!"))
}

const getAllOrders = async (user_id, status_id) => {
  const orders = await axios({
    method: 'get',
    url: '/order/get-all/' + user_id + '/' + status_id
  })
  return orders.data;
}

const payOrder = async (order_id) => {
  const res = await axios({
    method: 'post',
    url: '/order/pay-the-order/' + order_id
  })
  return res.data;
}

const change_status = async (order_id, status) => {
  const res = await axios({
    method: 'post',
    url: '/order/modify-order-status/' + order_id + '/' + status
  })
  return res.data;
}

const orderStatus = (status) => {
  const statusMap = {
    'Pending Payment': '待付款',
    'Order Timeout': '订单超时',
    'Awaiting Delivery': '待发货',
    'Delivered, Awaiting Confirmation': '已发货，待确认',
    'Finished': '已完成',
    'Cancelled': '已取消'
  };
  return statusMap[status] || '未知状态';
}


export {
  settleOrder,
  getAllOrders,
  orderStatus,
  payOrder,
  change_status
};
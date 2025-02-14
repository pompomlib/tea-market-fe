import {
  ref
} from "vue";

// 在列表中删除当前这个商品对象
const del_this_item_in_list = (items) => {
  for (var i = 0; i < items.value.length; i++) {
    if (items_list_in_shopping_cart.value[i].isSelected) {
      all_selected_items.value.push(items_list_in_shopping_cart.value[i]);
    }
  };
}
// 未完成
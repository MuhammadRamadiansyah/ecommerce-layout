// Vue.component('items-in-cart', {
//     name: 'items-in-cart',
//     template: `
//     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div class="modal-dialog modal-lg" role="document">
//             <div class="modal-content modal-cart">
//                 <div class="modal-header title-cart-table">
//                     <h5 class="modal-title" id="exampleModalLabel">Your Cart</h5>
//                 </div>
//                 <div class="modal-body">
//                     <table class="table text-center">
//                         <thead>
//                             <tr>
//                                 <th>Icon</th>
//                                 <th>Items</th>
//                                 <th>Quantity</th>
//                                 <th>Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr v-for="item in cartLists">
//                                 <td><img v-bind:src="item.image" style="height: 40px; width: 40px;"></td>
//                                 <td>{{item.title}}</td>
//                                 <td>
//                                     <div class="btn-group" role="group" aria-label="Basic example">
//                                         <button class="btn btn-outline-danger" type="button" aria-haspopup="true" aria-expanded="false" v-on:click="decreaseItem(item)">-</button>
//                                         <button class="btn btn-outline-secondary disabled" type="button" aria-haspopup="true" aria-expanded="false">{{item.quantity}}</button>
//                                         <button class="btn btn-outline-success" type="button" aria-haspopup="true" aria-expanded="false" v-on:click="increaseItem(item)">+</button>
//                                     </div>
//                                 </td>
//                                 <td>{{priceItems(item)}}</td>
//                             </tr>
//                             <tr class="total-price-items">
//                                 <td>Total Price: </td>
//                                 <td></td><td></td>
//                                 <td>{{totalPrice}}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div class="modal-footer">
//                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
//                     <button type="button" class="btn btn-success">Buy Item</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     `,
//     methods: {

//     }
// })
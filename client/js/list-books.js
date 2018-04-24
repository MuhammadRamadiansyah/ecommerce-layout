Vue.component('list-books', {
    name: 'list-books',
    template: `
    <div class="card text-center border-success mb-3 wobble">
        <div class="card-header border-success bg-success mb-3">
          {{book.name}}
        </div>
        <div class="card-body border-success mb-3">
					<img class="card-img-top border-success mb-3" style="margin: 15px; max-width: 10rem;" :src="book.image" alt="Card image cap">
					<p class="card-text">Price: {{ 'Rp ' + book.price.toLocaleString() + ',-'}}</p>
					<p class="card-text">Stock: {{ book.quantity - quantityTotal}}</p>
					<div v-if="checkItemInCart(book)">
						<button class="btn btn-outline-success" type="button" aria-haspopup="true" aria-expanded="false" @click="addItem()">Add to Cart</button>
					</div>
					<div v-else class="btn-group" role="group" aria-label="Basic example">
						<button type="button" class="btn btn-danger" aria-haspopup="true" aria-expanded="false" @click="decreaseItem()">-</button>
						<button type="button" class="btn btn-secondary">{{quantityTotal}}</button>
						<button type="button" class="btn btn-secondary disabled" aria-haspopup="true" aria-expanded="false" v-if="checkQuantity()">+</button>
						<button type="button" class="btn btn-success" aria-haspopup="true" aria-expanded="false" @click="addItem()" v-else>+</button>
					</div>
        </div>
        <div class="card-footer text-muted border-success mb-3">
            <footer class="footer"><cite title="Source Title">{{book.category.name}}</cite></footer>
        </div>
    </div>
    `,
		props: ['book','cartlists', 'user'],
		data () {
			return {
				isEmpty: false,
				quantity: 0,
			}
		},
    methods: {
        checkItemInCart: function(){
					let index = -1;
					if(this.user.cart.length>0){
						index = this.user.cart.findIndex(itemCart => itemCart._id === this.book._id);
					}
					if(index>-1){
						return false;
					}else{
						return true;
					}
        },
        addItem: function(){
					if(this.book.quantity - this.quantity == 0 && this.book.quantity == 1){
						this.quantity = 0
					}
					this.checkQuantity()
					if(!this.isEmpty){
						this.$emit('additem', this.book)
					}
					this.checkQuantity()
        },
        decreaseItem: function(){
					this.$emit('decreaseitem', this.book)
					if(this.book.quantity - this.quantity == 0 && this.book.quantity == 1){
						this.quantity = 0
					}
					this.checkQuantity()
				},
				checkQuantity () {	
					if( this.book.quantity - this.quantity <= 0){
						this.isEmpty = true
						return true
					} else {
						this.isEmpty = false
						return false
					}
				}
		},
		computed: {
			quantityTotal () {
				this.quantity = this.user.cart.filter(item => item._id === this.book._id).length
				return this.quantity
			},
		}
})
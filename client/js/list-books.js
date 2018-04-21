Vue.component('list-books', {
    name: 'list-books',
    template: `
    <div class="card text-center wobble">
        <div class="card-header">
          {{book.name}}
        </div>
        <div class="card-body">
					<img class="card-img-top" style="margin-bottom:10px;" :src="book.image" alt="Card image cap">
					<p class="card-text">{{ 'Rp ' + book.price.toLocaleString() + ',-'}}</p>
					<div v-if="checkItemInCart(book)">
						<button class="btn btn-outline-success" type="button" aria-haspopup="true" aria-expanded="false" @click="addItem()">Add to Cart</button>
					</div>
					<div v-else=""class="btn-group" role="group" aria-label="Basic example">
						<button type="button" class="btn btn-danger" aria-haspopup="true" aria-expanded="false" @click="decreaseItem()">-</button>
						<button type="button" class="btn btn-secondary">{{getQuantityItem(book)}}</button>
						<button type="button" class="btn btn-success" aria-haspopup="true" aria-expanded="false" @click="increaseItem()">+</button>
					</div>
        </div>
        <div class="card-footer text-muted">
            <footer class="footer"><cite title="Source Title">{{book.category.name}}</cite></footer>
        </div>
    </div>
    `,
    props: ['book','cartlists', 'user'],
    methods: {
        checkItemInCart: function(item){
            let index = -1;
            if(this.cartlists.length>0){
                index = this.cartlists.findIndex(oldBook => oldBook.id === item.id);
            }
            if(index>-1){
                return false;
            }else{
                return true;
            }
        },
        addItem: function(){
           this.$emit('additem', this.book)
        },
        increaseItem: function(){
            this.$emit('increaseitem', this.book)
        },
        decreaseItem: function(){
            this.$emit('decreaseitem', this.book)
        },
        getQuantityItem: function(item){
            let index = this.cartlists.findIndex(oldBook => oldBook.id === item.id);
            if(index >-1){
                return this.cartlists[index].quantity
            }
        },
    }
})
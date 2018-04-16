Vue.component('list-books', {
    name: 'list-books',
    template: `
    <div class="card text-center wobble">
        <div class="card-body">
            <img class="card-img-top" style="margin-bottom:10px;" src="http://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501173219/all-the-light-we-cannot-see-9781501173219.jpg" alt="Card image cap">
            <p class="card-text">{{book.price.toLocaleString()}}</p>
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
            <span v-for="rating in book.rating" class="fa fa-star checked"></span>
        </div>
    </div>
    `,
    props: ['book','cartlists'],
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
Vue.component('navbar-header', {
    name: 'navbar-header',
    template: `
    <nav class="navbar navbar-light bg-light">
			<div class="logo-container">
				<a class="navbar-brand" href="index.html">iBooks!</a>
			</div>
			<div class="menu-container"> 
				<ul class="nav navbar-nav flex-row justify-content-between ml-auto">
					<li class="dropdown order-1">
						<div class="dropdown-menu">
							<form class="px-4 py-3">
								<div class="form-group">
									<label for="exampleDropdownFormEmail1">Email address</label>
									<input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="email">
								</div>
								<div class="form-group">
									<label for="exampleDropdownFormPassword1">Password</label>
									<input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" v-model="password">
								</div>
								<button type="button" class="btn btn-primary" @click="login">Sign in</button>
							</form>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" data-toggle="modal" data-target="#exampleModalRegis">New around here? Sign up</a>
						</div>
						<button class="btn btn-outline-success" id="dropdownMenu1" data-toggle="modal" data-target="#exampleModal1" v-if="islogin"> <span class="fa fa-money" aria-hidden="true"></span> BALANCE: Rp. {{user.balance.toLocaleString()}},-</button>
						<button class="btn btn-outline-success" id="dropdownMenu1" data-toggle="modal" data-target="#exampleModal" v-if="islogin"> <span class="fa fa-shopping-cart" aria-hidden="true"></span> CART</button>
						<button type="button" id="dropdownMenu1" class="btn btn-outline-danger" @click="logout" v-if="islogin"><span class="fa fa-sign-out"></span> SIGN OUT</button>
						<button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-success dropdown-toggle" v-else><span class="fa fa-user"> SIGN IN</span></button>
					</li>
				</ul>
			</div>
			<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
					<div class="modal-content modal-cart">
						<div class="modal-header title-cart-table">
								<h5 class="modal-title" id="exampleModalLabel">Your Cart</h5>
						</div>
						<div class="modal-body">
								<table class="table text-center">
									<thead>
										<tr>
											<th>No</th>
											<th>Image</th>
											<th>Items</th>
											<th>Quantity</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in lists" :key="index">
											<td>{{index + 1}}</td>
											<td><img :src="item.image" style="max-width: 3rem;"></td>
											<td>{{item.name}}</td>
											<td>
												<div class="btn-group" role="group" aria-label="Basic example">
													<button class="btn btn-outline-danger" type="button" aria-haspopup="true" aria-expanded="false" @click="decreaseItem(item)">-</button>
													<button class="btn btn-outline-secondary disabled" type="button" aria-haspopup="true" aria-expanded="false">{{getCartQtyItems(item)}}</button>
													<button class="btn btn-outline-secondary" type="button" aria-haspopup="true" aria-expanded="false" v-if="checkQuantity(item)">+</button>
													<button class="btn btn-outline-success" type="button" aria-haspopup="true" aria-expanded="false" @click="increaseItem(item)" v-else>+</button>
												</div>
											</td>
											<td>{{'Rp. ' + (getCartQtyItems(item) * item.price).toLocaleString() + ',-'}}</td>
										</tr>
										<tr class="total-price-items" style="border-top: 2px solid black;">
											<td>Total Price: </td>
											<td></td><td></td><td></td>
											<td>{{'Rp. ' + getTotalPrice.toLocaleString() + ',-'}}</td>
										</tr>
									</tbody>
								</table>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-success" @click="checkout(getTotalPrice)">Checkout</button>
						</div>
					</div>
        </div>
			</div>
			<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">TOP UP</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="input-group mb-3">
								<input type="text" class="form-control" placeholder="example: 50000" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="topUp">
								<div class="input-group-append">
									<button class="btn btn-outline-secondary" type="button" @click="top_up()">Top up</button>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary btn-block btn-lg" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="exampleModalRegis" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabelRegis">Register</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<label for="exampleInpuFirstNamel1">First Name</label>
									<input type="text" name="first_name" class="form-control"  aria-describedby="emailHelp" placeholder="Enter first name" v-model="first_name">
									<small id="firstHelpRegis" class="form-text text-muted"></small>
								</div>
								<div class="form-group">
									<label for="exampleInputLastName1">Last Name</label>
									<input type="text" name="last_name" class="form-control"  aria-describedby="emailHelp" placeholder="Enter last name" v-model="last_name">
									<small id="lastHelpRegis" class="form-text text-muted"></small>
								</div>
								<div class="form-group">
									<label for="exampleInputEmail1">Email address</label>
									<input type="email" name="new_email" class="form-control" id="exampleInputEmail1Regis" aria-describedby="emailHelp" placeholder="Enter email" v-model="newEmail">
									<small id="emailHelpRegis" class="form-text text-muted"></small>
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1">Password</label>
									<input type="password" name="new_password" class="form-control" id="exampleInputPassword1Regis" placeholder="Password"  v-model="newPassword">
									<small id="passwordHelpRegis" class="form-text text-muted"></small>
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1"> Confirm Password</label>
									<input type="password" name="confirm_password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password" v-model="newConfirmPassword">
									<small id="passwordConfirmHelpRegis" class="form-text text-muted"></small>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary btn-lg" :class="{disabled: checkValidation()}" @click="register">Submit</button>
						</div>
					</div>
				</div>
			</div>
    </nav>
    `,
    data: function () {
        return {
					email: '',
					password: '',
					items: [],
					topUp: '',
					first_name: '',
					last_name: '',
					newEmail: '',
					newPassword: '',
					newConfirmPassword: '',
					isEmail: false,
					isPassword: false,
					isConfirm: false
        }
		},
		props: ['islogin', 'user', 'lists'],
    methods: {
        login() {
            console.log(this.email)
						console.log(this.password)
						axios.post('http://localhost:3000/users/signin',{email: this.email, password: this.password})
								 .then((response) => {
										localStorage.setItem('token', response.data.result)
										swal({
											title: "Good job!",
											text: "You are login right now!",
											icon: "success",
											button: "Ok!",
										});
										window.setTimeout(function(){ 
											location.reload();
										} ,2000);
								 })
								 .catch((err) => {
										swal("Login failed", err.message, "failed");
								 })
				},
				logout () {
					swal({
						title: "Are you sure?",
						text: "Once deleted, you will not be able to recover your cart lists?",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					})
					.then((willDelete) => {
						if (willDelete) {
							localStorage.removeItem('token')
							swal("You are logout now!", {
								icon: "success",
							});
							window.setTimeout(function(){ 
								location.reload();
							} ,2000);
						} else {
							swal("Your still login");
						}
					})
				},
				getCartQtyItems (item) {
					return this.user.cart.filter(book => book._id === item._id).length
				},
				increaseItem (item) {
					this.$emit('additem', item)
				},
				decreaseItem (item) {
					this.$emit('decreaseitem', item)
				},
				checkQuantity (item) {
					if( item.quantity - this.getCartQtyItems(item)  <= 0){
						return true
					} else {
						return false
					}
				},
				checkout (totalPrice) {
					let items = this.lists
					let updateItems = []
					let objUpdateItems = {}
					items.forEach(element => {
						objUpdateItems = {}
						objUpdateItems.name = element.name
						objUpdateItems._id = element._id
						objUpdateItems.quantity = this.getCartQtyItems(element)
						updateItems.push(objUpdateItems)
					});
					swal({
						title: "Are you sure?",
						text: "Do you want to buy all this items?",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					})
					.then((willBuy) => {
						if (willBuy) {
							if(this.user.balance - totalPrice >= 0){
								axios.put('http://localhost:3000/users/checkout', {totalPrice, updateItems}, {headers: {token: localStorage.getItem('token')}})
								.then((response) => {
									swal("You are successfully buy your items!", {
										icon: "success",
									});
									window.setTimeout(function(){ 
										location.reload();
									} ,2000);
								})
								.catch((err) => {
									swal("Checkout failed", err.message, "failed");
								})
							} else {
								swal("Checkout failed", "You dont have enough balance", "failed");
							}			
						} else {
							swal("You cancel to checkout");
						}
					})

				},
				top_up () {
					let balance = parseInt(this.topUp)
					axios.patch('http://localhost:3000/users/topup', {balance}, {headers: {token: localStorage.getItem('token')}})
							 .then((response) => {
									swal({
										title: "Good job!",
										text: `Congratulations your balance : Rp. ${response.data.result.toLocaleString()},-`,
										icon: "success",
										button: "Ok!",
									});
									window.setTimeout(function(){ 
										location.reload();
									} ,2000);
							 })
							 .catch((err) => {
									swal("Top up failed", err.message, "failed");
							 })
				},
				register () {
					if(this.checkValidation()){
						swal("WARNING!", "You have to fill in all of the form text label");
					} else {
						let email = this.newEmail
						let password = this.newPassword
						let role = 'user'
						let balance = 0
						let first_name = this.first_name
						let last_name = this.last_name
						axios.post('http://localhost:3000/users/signup', {email, password, role, balance, first_name, last_name}, {})
								.then((response) => {
									console.log(response)
									swal({
										title: "Congratulations",
										text: "You are an user in this app right now",
										icon: "success",
										button: "Ok!",
									});
									window.setTimeout(function(){ 
										axios.post('http://localhost:3000/users/signin', {email, password}, {})
												.then((response) => {
														localStorage.setItem('token', response.data.result)
														window.location.href="index.html"
												})
												.catch((err) => {
													swal("Login failed", err.message, "failed");
												})
									} ,3000);
								})
								.catch((err) => {
									swal("Register failed", err.message, "failed");
								})
					}
				},
				checkValidation () {
					if(this.isEmail && this.isConfirm && this.isPassword && this.isFirstName && this.isLastName ) return false ; return true;
				}
		},
		computed: {
			getTotalPrice () {
				if(this.user.cart){
					let items = this.user.cart.map(item => item.price)
					if(items.length > 0){
						const reducer = (accumulator, currentValue) => accumulator + currentValue;
						return items.reduce(reducer)
					}
					return 0
				}
				return 0
			}
		},
		watch: {
			newEmail: function () {
				console.log(this.newEmail)
				let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				let checkEmail = re.test(String(this.newEmail).toLowerCase());
				if(checkEmail){
					$('#emailHelpRegis').text("correct email").css("color","green")
					$('[name="new_email"]').css({"border-color": "green", "border-solid": "bold", "border-width": "3px"})
					this.isEmail = true;
				} else {
					console.log('still')
					$('#emailHelpRegis').text("wrong email").css("color","red")
					$('[name="new_email"]').css({"border-color": "red", "border-solid": "bold", "border-width": "3px"})
					this.isEmail = false;
				}
			},
			newPassword: function () {
				console.log(this.newPassword)
				if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(String(this.newPassword))){
					$('#passwordHelpRegis').text("correct password").css("color","green")
					$('[name="new_password"]').css({"border-color": "green", "border-solid": "bold", "border-width": "3px"})
					this.isPassword = true;
				}else{
					$('#passwordHelpRegis').text("password must contain at least 1 uppercase, 1 lowercase, and 1 number").css("color","green")
					$('[name="new_password"]').css({"border-color": "red", "border-solid": "bold", "border-width": "3px"})
					this.isPassword = false;
				}
			},
			newConfirmPassword: function () {
				if(this.newConfirmPassword === this.newPassword){
					$('#passwordConfirmHelpRegis').text("password match").css("color","green")
					$('[name="confirm_password"]').css({"border-color": "green", "border-solid": "bold", "border-width": "3px"})
					this.isConfirm = true
				} else {
					$('#passwordConfirmHelpRegis').text("password not match").css("color","red")
					$('[name="confirm_password"]').css({"border-color": "red", "border-solid": "bold", "border-width": "3px"})
					this.isConfirm = false;
				}
			},
			first_name: function () {
				if(this.first_name.length > 5){
					$('#firstHelpRegis').text("first name correct !").css("color","green")
					$('[name="first_name"]').css({"border-color": "green", "border-solid": "bold", "border-width": "3px"})
					this.isFirstName = true
				} else {
					$('#firstHelpRegis').text("first name at least 6 characters !").css("color","red")
					$('[name="first_name"]').css({"border-color": "red", "border-solid": "bold", "border-width": "3px"})
					this.isFirstName = false
				}
			},
			last_name: function () {
				if(this.last_name.length > 5){
					$('#lastHelpRegis').text("last name correct !").css("color","green")
					$('[name="last_name"]').css({"border-color": "green", "border-solid": "bold", "border-width": "3px"})
					this.isLastName = true
				} else {
					$('#lastHelpRegis').text("last name at least 6 characters !").css("color","red")
					$('[name="last_name"]').css({"border-color": "red", "border-solid": "bold", "border-width": "3px"})
					this.isLastName = false
				}
			}
		},
})
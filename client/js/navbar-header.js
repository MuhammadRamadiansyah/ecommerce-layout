Vue.component('navbar-header', {
    name: 'navbar-header',
    template: `
    <nav class="navbar navbar-light bg-light container-navbar">
			<div class="logo-container">
				<a class="navbar-brand" href="index.html">iBooks!</a>
			</div>
			<div class="search-container">
				<form class="form-inline">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>                        
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
							<a class="dropdown-item" href="register.html">New around here? Sign up</a>
						</div>
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
											<th>Icon</th>
											<th>Items</th>
											<th>Quantity</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="item in cartLists">
											<td><img v-bind:src="item.image" style="height: 40px; width: 40px;"></td>
											<td>{{item.title}}</td>
											<td>
												<div class="btn-group" role="group" aria-label="Basic example">
													<button class="btn btn-outline-danger" type="button" aria-haspopup="true" aria-expanded="false" v-on:click="decreaseItem(item)">-</button>
													<button class="btn btn-outline-secondary disabled" type="button" aria-haspopup="true" aria-expanded="false">{{item.quantity}}</button>
													<button class="btn btn-outline-success" type="button" aria-haspopup="true" aria-expanded="false" v-on:click="increaseItem(item)">+</button>
												</div>
											</td>
											<td>{{priceItems(item)}}</td>
										</tr>
										<tr class="total-price-items">
											<td>Total Price: </td>
											<td></td><td></td>
											<td>{{totalPrice}}</td>
										</tr>
									</tbody>
								</table>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-success">Buy Item</button>
						</div>
					</div>
        </div>
    	</div>   
    </nav>
    `,
    data: function () {
        return {
            email: '',
            password: ''
        }
		},
		props: ['islogin', 'user'],
    methods: {
        login() {
            console.log(this.email)
						console.log(this.password)
						axios.post('http://localhost:3000/users/signin',{email: this.email, password: this.password})
								 .then((response) => {
										console.log(response.data.result)
										localStorage.setItem('token', response.data.result)
										location.reload()
								 })
								 .catch((err) => {
									 alert('login failed')
								 })
				},
				logout () {
					localStorage.removeItem('token')
					location.reload()
				}
    }
})
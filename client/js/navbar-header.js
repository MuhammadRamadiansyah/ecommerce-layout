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
                    <button type="button" id="dropdownMenu1" data-toggle="dropdown" class="btn btn-outline-success dropdown-toggle"><span class="fa fa-user"></span></button>
                    <div class="dropdown-menu">
                        <form class="px-4 py-3">
                            <div class="form-group">
                                <label for="exampleDropdownFormEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
                            </div>
                            <div class="form-group">
                                <label for="exampleDropdownFormPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
                            </div>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="dropdownCheck">
                                <label class="form-check-label" for="dropdownCheck">
                                    Remember me
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary">Sign in</button>
                        </form>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">New around here? Sign up</a>
                        <a class="dropdown-item" href="#">Forgot password?</a>
                    </div>
                    <div class="btn-group">
                            <button class="btn btn-outline-success dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="fa fa-gear" aria-hidden="true">
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Profle</a>
                                <a class="dropdown-item" href="#">About Us</a>
                                <a class="dropdown-item" href="#">Help</a>
                            </div>
                    </div>
                    <button class="btn btn-outline-success" id="dropdownMenu1" data-toggle="modal" data-target="#exampleModal"><span class="fa fa-shopping-cart" aria-hidden="true"></span></button>
                </li>
            </ul>
        </div>   
    </nav>
    `
})
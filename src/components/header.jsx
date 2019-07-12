import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {onLogout} from './../redux/actions'

class Example extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//   }
    state = {
        isOpen : false
    }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  onBtnLogoutClick = () => {
    this.props.onLogout()
    localStorage.removeItem('terserah')
  }

  render() {
    var admin = this.props.isAdmin
    console.log(admin)
    if(admin===true){
      return (
      <div>
        <Navbar color="dark" light expand="md">
          <Link to='/'>
          <NavbarBrand style={{color:'white'}}>Bioskop-Purwadhika</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <Link to='/manage'>
                <NavLink style={{color:'white'}} >Manage</NavLink>
                </Link>
              </NavItem>
              {/* <NavItem>
                <Link to='/login'>
                <NavLink >Sign Up</NavLink>
                </Link>
              </NavItem> */}
              {
              this.props.name !== ""
              ?
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color:'white'}}>
                  {this.props.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogoutClick}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              :
              null
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }else{
    return(

      <div>
        <Navbar color="dark" className="bg-img navbar-expand-sm">
           <NavbarBrand className='nav-item'>
             <Link to='/'  style={{color:'white'}}>Bioskop-Purwadhika</Link>
                
            </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              {
                this.props.name !== ""
                ?
                <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={{color:'white'}} nav caret>
                  {this.props.name }
                </DropdownToggle>
                <DropdownMenu right >
                  <DropdownItem onClick={this.onBtnLogoutClick}>
                    Log Out
                  </DropdownItem>
                  <DropdownItem>
                    <Link to ='/cart'><NavLink style={{color:'white'}}  >Cart Page</NavLink></Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to ='/history'><NavLink style={{color:'white'}}  >History Page</NavLink></Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
              :
              <Nav className="ml-auto" navbar>
              <NavItem>
               <Link to='/register'> <NavLink style={{color:'white'}} >Sign Up</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to='/login'><NavLink style={{color:'white'}} >Login</NavLink></Link>
              </NavItem>
            </Nav>
            }
          </Collapse>
        </Navbar>
      </div>
  )
  }
  }
}
  
const mapStateToProps = (state) => {
  return {
    name : state.user.username,
    isAdmin : state.user.isAdmin
  }
}

export default connect (mapStateToProps , {onLogout})(Example)
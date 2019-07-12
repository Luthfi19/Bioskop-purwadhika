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
  }
}

const mapStateToProps = (state) => {
  return {
    name : state.user.username
  }
}

export default connect (mapStateToProps , {onLogout})(Example)
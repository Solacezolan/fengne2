import React from 'react';
import '../static/css/Home.scss';
import { Breadcrumb, Icon} from 'antd';
import API from '../api/api.js';


class Home extends React.Component{
	constructor(props) {
    super(props);
    this.state = {visible: false};
  }
	componentDidMount(){
	  	API.getUser({id:6}).then(response => {
               console.log(123456)
            }, err => {
                   console.log(123)
            }).catch(err => {
                   console.log(123)
            });
		}
	render(){
		return(
			<div>
			  <Breadcrumb>
    <Breadcrumb.Item href="">
      <Icon type="home" />
    </Breadcrumb.Item>
    <Breadcrumb.Item href="">
      <Icon type="user" />
      <span>Application List</span>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      Application
    </Breadcrumb.Item>
  </Breadcrumb>
  </div>
		)
	}
}
export default Home;
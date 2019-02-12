import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { 
    toggleNavBaseball, 
    toggleNavBasketball, 
    toggleNavFootball, 
    toggleNavHockey, 
    toggleNavBaseball2010Older, 
    toggleNavFootball2010Older, 
    toggleNavBasketball2010Older,  
    toggleNavHockey2010Older
} from '../actions/nav-bar';


export class NavBar extends React.Component {

    handleToggleNavBaseball() {
        this.props.dispatch(toggleNavBaseball());
    }

    handleToggleNavBasketball() {
        this.props.dispatch(toggleNavBasketball());
    }

    handleToggleNavFootball() {
        this.props.dispatch(toggleNavFootball());
    }

    handleToggleNavHockey() {
        this.props.dispatch(toggleNavHockey());
    }

    handleToggleNavBaseball2010Older() {
        this.props.dispatch(toggleNavBaseball2010Older());
    }

    handleToggleNavBasketball2010Older() {
        this.props.dispatch(toggleNavBasketball2010Older());
    }

    handleToggleNavFootball2010Older() {
        this.props.dispatch(toggleNavFootball2010Older());
    }

    handleToggleNavHockey2010Older() {
        this.props.dispatch(toggleNavHockey2010Older());
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <div></div>
            )
        }

        return (
            <div className="nav-bar">
                <div className="gray-logo"> </div>
                <div className="nav-menu">
                    <ul>
                        <li><Link className="text" to='/'>Home</Link></li>
                        <li>Sports</li>
                        <li className="nav-baseball" onClick={() => this.handleToggleNavBaseball()}><Link className="text" to='/'>Baseball</Link></li>
                        <ul style={{ display: this.props.toggleNavBaseball ? 'block' : 'none' }}>
                            <li><Link className="text" to='/baseball-2019'>2019</Link></li>
                            <li><Link className="text" to='/baseball-2018'>2018</Link></li>
                            <li><Link className="text" to='/baseball-2017'>2017</Link></li>
                            <li><Link className="text" to='/baseball-2016'>2016</Link></li>
                            <li><Link className="text" to='/baseball-2015'>2015</Link></li>
                            <li><Link className="text" to='/baseball-2014'>2014</Link></li>
                            <li><Link className="text" to='/baseball-2013'>2013</Link></li>
                            <li><Link className="text" to='/baseball-2012'>2012</Link></li>
                            <li><Link className="text" to='/baseball-2011'>2011</Link></li>
                            <li onClick={() => this.handleToggleNavBaseball2010Older()}><Link className="text" to='/baseball-2010-and-older'>2010 & Older</Link></li>
                            <ul style={{ display: this.props.toggleNavBaseball2010Older ? 'block' : 'none' }}>
                                <li>2010</li>
                                <li>2009</li>
                                <li>2008</li>
                                <li>2007</li>
                                <li>2006</li>
                                <li>2005</li>
                                <li>2004</li>
                                <li>2003</li>
                                <li>2002</li>
                                <li>2001</li>
                                <li>2000</li>
                            </ul>
                        </ul>
                        <li className="nav-basketball" onClick={() => this.handleToggleNavBasketball()}><Link className="text" to='/'>Basketball</Link></li>
                        <ul style={{ display: this.props.toggleNavBasketball ? 'block' : 'none' }}>
                            <li>2018/19</li>
                            <li>2017/18</li>
                            <li>2016/17</li>
                            <li>2015/16</li>
                            <li>2014/15</li>
                            <li>2013/14</li>
                            <li>2012/13</li>
                            <li>2011/12</li>
                            <li onClick={() => this.handleToggleNavBasketball2010Older()}><Link className="text" to='/'>2010/11 & Older</Link></li>
                            <ul style={{ display: this.props.toggleNavBasketball2010Older ? 'block' : 'none' }}>
                                <li>2010/11</li>
                                <li>2009/10</li>
                                <li>2008/09</li>
                                <li>2007/08</li>
                                <li>2006/07</li>
                                <li>2005/06</li>
                                <li>2004/05</li>
                                <li>2003/04</li>
                                <li>2002/03</li>
                                <li>2001/02</li>
                                <li>2000/01</li>
                            </ul>
                        </ul>
                        <li className="nav-football" onClick={() => this.handleToggleNavFootball()}><Link className="text" to='/'>Football</Link></li>
                        <ul style={{ display: this.props.toggleNavFootball ? 'block' : 'none' }}>
                            <li>2019</li>
                            <li>2018</li>
                            <li>2017</li>
                            <li>2016</li>
                            <li>2015</li>
                            <li>2014</li>
                            <li>2013</li>
                            <li>2012</li>
                            <li>2011</li>
                            <li onClick={() => this.handleToggleNavFootball2010Older()}><Link className="text" to='/'>2010 & Older</Link></li>
                            <ul style={{ display: this.props.toggleNavFootball2010Older ? 'block' : 'none' }}>
                                <li>2010</li>
                                <li>2009</li>
                                <li>2008</li>
                                <li>2007</li>
                                <li>2006</li>
                                <li>2005</li>
                                <li>2004</li>
                                <li>2003</li>
                                <li>2002</li>
                                <li>2001</li>
                                <li>2000</li>
                            </ul>
                        </ul>
                        <li className="nav-hockey" onClick={() => this.handleToggleNavHockey()}><Link className="text" to="/">Hockey</Link></li>
                        <ul style={{ display: this.props.toggleNavHockey ? 'block' : 'none' }}>
                            <li>2018/19</li>
                            <li>2017/18</li>
                            <li>2016/17</li>
                            <li>2015/16</li>
                            <li>2014/15</li>
                            <li>2013/14</li>
                            <li>2012/13</li>
                            <li>2011/12</li>
                            <li onClick={() => this.handleToggleNavHockey2010Older()}><Link className="text" to='/'>2010/11 & Older</Link></li>
                            <ul style={{ display: this.props.toggleNavHockey2010Older ? 'block' : 'none' }}>
                                <li>2010/11</li>
                                <li>2009/10</li>
                                <li>2008/09</li>
                                <li>2007/08</li>
                                <li>2006/07</li>
                                <li>2005/06</li>
                                <li>2004/05</li>
                                <li>2003/04</li>
                                <li>2002/03</li>
                                <li>2001/02</li>
                                <li>2000/01</li>
                            </ul>
                        </ul>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser,
    toggleNavBaseball: state.nav.toggleNavBaseball,
    toggleNavBasketball: state.nav.toggleNavBasketball,
    toggleNavFootball: state.nav.toggleNavFootball,
    toggleNavHockey: state.nav.toggleNavHockey,
    toggleNavBaseball2010Older: state.nav.toggleNavBaseball2010Older,
    toggleNavBasketball2010Older: state.nav.toggleNavBasketball2010Older,
    toggleNavFootball2010Older: state.nav.toggleNavFootball2010Older,
    toggleNavHockey2010Older: state.nav.toggleNavHockey2010Older,
});

export default requiresLogin()(connect(mapStateToProps)(NavBar));
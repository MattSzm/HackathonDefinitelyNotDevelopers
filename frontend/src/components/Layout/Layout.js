import React, { Component, Fragment } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import SideBar from '../SideBar/SideBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';


export default function Layout() {

    return (
        <Fragment>
            <SideBar>
            </SideBar>
        </Fragment >
    );
}
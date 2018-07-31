/* const header = new Header(document.body);
header.render();

const title = new PageTitle(document.body);
title.render();

const sidebar = new Sidebar(document.body);
sidebar.render(); */

const layout = new Layout(document.body);
layout.render();

// const dashboard = new Dashboard(document.querySelector('.main'));
// dashboard.render();
const router = new Router(document.querySelector('.main'));
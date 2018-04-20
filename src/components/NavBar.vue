<template>
    <div id="NavBar">
        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
        <li><a href="#!">one</a></li>
        <li><a href="#!">two</a></li>
        <li class="divider"></li>
        <li><a href="#!">three</a></li>
        </ul>
        <nav>
        <div class="nav-wrapper">
            <!-- <a href="#!" class="brand-logo">Snote</a> -->
            <router-link to='/' class="brand-logo">Snote</router-link>
            <ul class="right hide-on-med-and-down">
                <li><a href="sass.html">How it works?</a></li>
                <li><a href="badges.html">Contact Us</a></li>
                <!-- Dropdown Trigger -->
                <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
var $ = require('jquery');

export default {
    name: 'NavBar'
}
</script>

<style lang="css" scoped>
    #NavBar {
        margin-left: 10px;
        margin-right: 10px;
    }
    .brand-logo{
        padding-left: 10px;
    }
</style>

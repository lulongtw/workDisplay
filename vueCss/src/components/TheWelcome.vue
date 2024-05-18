<script setup>
    import WelcomeItem from "./WelcomeItem.vue"
    import Pic1 from "./pic/pic1.vue"
    import Pic2 from "./pic/pic2.vue"
    import Pic3 from "./pic/pic3.vue"
    import Pic4 from "./pic/pic4.vue"
    import Pic5 from "./pic/pic5.vue"
  

</script>

<template>

    <WelcomeItem>
        <template #icon>
            <Pic1></Pic1>
        </template>

        <template #title>Documentation</template>

        <template #content>Vue’s official documentation provides you with all information you need to get started.</template>
    </WelcomeItem>
    <WelcomeItem>
        <template #icon>
            <Pic2></Pic2>
        </template>

        <template #title>Tooling</template>

        <template #content>This project is served and bundled with Vite. The recommended IDE setup is VSCode + Volar. If you need to test your components and web pages, check out Cypress and Cypress Component Testing.
More instructions are available in README.md.</template>
    </WelcomeItem>
    <WelcomeItem>
        <template #icon>
            <Pic3></Pic3>
        </template>

        <template #title>Eco</template>

        <template #content>Get official tools and libraries for your project: Pinia, Vue Router, Vue Test Utils, and Vue Dev Tools. If you need more resources, we suggest paying Awesome Vue a visit.</template>
    
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <Pic4></Pic4>
        </template>
        <template #title>
            Community
        </template>
        <template #content>
            Got stuck? Ask your question on Vue Land, our official Discord server, or StackOverflow. You should also subscribe to our mailing list and follow the official @vuejs twitter account for latest news in the Vue world.
        </template>
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
            <Pic5></Pic5>
        </template>
        <template #title>
            Support Vue
        </template>
        <template #content>
            As an independent project, Vue relies on community backing for its sustainability. You can help us by becoming a sponsor.
        </template>
    </WelcomeItem>

</template>



<style scoped></style>
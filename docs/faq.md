<!-- meta
{
  "node": {
    "label": "FAQ",
    "category": {
      "label": "Basics"
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 2
    }
  }
}
meta -->

# Frequently asked questions about Luigi

<!-- accordion:start -->

### What is Luigi?

Luigi is a micro frontend framework that helps you build modularizable, extensible, scalable and consistent UIs and web applications (for administrators and business users).

You can watch this video of a Luigi use case to understand its functions better:
<iframe width="560" height="315" src="https://www.youtube.com/embed/fRYESd-YDhA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### What are micro frontends?

The term "micro frontends" extends the concepts of micro services to the frontend. It's an architectural style where big frontend monoliths are decomposed into smaller and simpler chunks to be developed, tested, deployed and maintained independently and rapidly (by many distributed teams), while still appearing to the customer as a one cohesive product.

This video which explains the basics of micro frontend architecture and how it can be implemented with Luigi:
<iframe width="560" height="315" src="https://www.youtube.com/embed/Bjp1_yvtR4Y" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Does Luigi deliver micro frontends?

No, Luigi itself does not deliver any micro frontends. It is a framework that helps you develop micro frontends and connect them to web applications.

### Is Luigi only useful in the context of SAP or very large corporate applications?

No, Luigi can be used independently of SAP for a variety of purposes. You can find one example in [this article](https://medium.com/swlh/luigi-micro-fronteds-orchestrator-8c0eca710151) which describes how to create a small hobby project using Luigi.

### Where can I download Luigi?

The Luigi project can be found on [GitHub](https://github.com/SAP/luigi). Depending on the UI framework you use, there are different setups for Luigi. You can find more information here: [application setup](application-setup.md).

### The distributed development possibilities seem like a big advantage; is that just an additional benefit from using Luigi, or was that a main factor behind it?

Development scalability was one of the main goals right from the beginning. There is a nice article on [martinfowler.com](https://martinfowler.com/articles/micro-frontends.html) explaining the benefits of a micro frontend architecture in general. All the disadvantages of the iframe approach mentioned in the article are solved with Luigi.

### One of the potential issues with a micro frontend architecture is styling. You suggest to use the CSS elements of Fundamentals to solve that issue. Is that correct?

It is crucial that all micro frontends in a solution follow the same design guidelines. Luigi's default UI styling is based on [Fundamentals](https://sap.github.io/fundamental-styles/) but it can be customised. If you don’t want to use Fundamentals, but Bootstrap, Material, or something else instead, you need to re-style the Luigi view components according to your design guidelines or replace them with your own components completely.

### I don't want to use the default Fiori Fundamentals style. How can I style Luigi differently?

There are a few options to do that at the moment:
- Use the Fundamental Styles theming capabilities which already allow you to achieve a lot by customizing the CSS variables. Find more info [here](https://github.com/SAP/theming-base-content).
- Manually overwrite the styles where needed. The documentation page you are on right now can be used as an example, as it was developed with Luigi!
- Turn off Luigi view components completely via the [hideNavigation](general-settings.md) parameter in the `settings:` section of your Luigi configuration. Then you can implement your own view components for header and navigation and use the [Luigi Core API](luigi-core-api.md) to set them up with Luigi.

### Luigi claims to be ‘technology agnostic’. Are you referring to the UI framework that can be used, or to some other technology?

The main point is that you can choose any base frontend technology you prefer, such as UI5, Angular, React, or Vue. You can even mix them in one solution. One micro frontend can use UI5, while another is written in Angular and Fundamentals. The only thing that matters is that HTML/JavaScript/CSS resources are provided and served via HTTPS in the end. The fact that a micro frontend is its own web application also means that you have full freedom regarding your development toolchain and CI/CD solutions, and the web server you want to use (such as Nginx, Apache, Tomcat, or Github Pages).

Last but not least, "technology agnostic" also means that there are no conflicts regarding any additional libraries you use, such as D3.js, Chart.js, or others. You can also avoid conflicts between different versions of the same library. Imagine a monolithic web application where a lot of teams are contributing and there has been a decision that Chart.js is the data visualization framework of choice, and then there is a need for updating the version, which potentially has breaking changes. In that case, all the teams have to be approached and asked if they use it, if their code is affected by the version update and, if so, when they can deliver the necessary changes. With Luigi, you don‘t have this management overhead at all.

### Are there any equivalents of Luigi?

Yes, there are several. Here are some of the most popular: [Mosaic](https://www.mosaic9.org/), [Single-spa](https://github.com/CanopyTax/single-spa), [OpenComponents](https://opencomponents.github.io/), [Piral](https://www.piral.io). Note that they are not 100% equivalents of Luigi!

<!--
### In what way is Luigi different from these mentioned framework/products?

TBD
-->

### Is Luigi already being used within any products, or is it still too new?

Yes, it is already being used in production and close-to-production within SAP. For example in Kyma, SAP C/4HANA Cockpit, Context Driven Services, Konduit and Varkes. Outside of SAP, SAAS AG (partner) uses Luigi. Additionally, there are some POCs going on and we're supporting a few other customers and partners who want to start using Luigi soon.

<!-- accordion:end -->

<!-- meta
{
  "node": {
    "label": "FAQ",
    "category": {
      "label": "Basics"
    },
    "metaData": {
      "categoryPosition": 1,
      "position": 3
    }
  }
}
meta -->

# Frequently asked questions about Luigi

<!-- accordion:start -->

### What is Luigi?

Luigi is a micro frontend framework that helps you to build modularizable, extensible, scalable and consistent UIs and Web Apps (for administrators and business users).

### What are micro frontends?

The term Micro Frontends extends the concepts of micro services to the frontend. It's an architectural style where big frontend monoliths are decomposed into smaller and simpler chunks to be developed, tested, deployed and maintained independently and rapidly (by many distributed teams), while still appearing to the customer as a one cohesive product.

### Does Luigi deliver micro frontends?

No, Luigi itself does not deliver any micro frontends. It is a framework that supports you to develop micro frontends.

### Where can I download Luigi?

The Luigi project can be found on GitHub. Depending on the UI framework you use there are different setups with Luigi. Please familiarise here: [application-setup](application-setup.md)

### The approach behind Luigi sounds like it was developed for scenarios where Kyma is used (i.e. technology-independent, extension/integration of various SAP/3rd-party apps, on-premise and cloud-based), is that correct?

Luigi is not bound to Kyma and can be used in other scenarios as well. CDS uses Luigi for creating 20+ standalone micro frontends developed by 7 teams and the C/4HANA Cockpit tries to combine many different application in one overlaying UI. FSM (Coresystems) plans to reuse Luigi's capabilities for their +30 web apps and commerce plans to use Luigi for their backoffice.

### The distributed development possibilities seem like a big advantage; is that just an additional benefit from using Luigi, or was that a main factor behind it?

Development scalability was one of the main goals right from the beginning. There is a nice article on martinfowler.com explaining the benefits of a micro frontend architecture in general: https://martinfowler.com/articles/micro-frontends.html. All the disadvantages of the iframe approach mentioned in the article are solved with Luigi. 

### One of the topics in that article on martinfowler.com that stood out was the styling issue. You suggest to use the CSS elements of Fundamentals to solve that issue. Is that correct?

It is crucial that all micro frontends in a solution follow the same design guidelines. Fortunately we have such guidelines within SAP (Fiori 3) and we have libraries making it easy to implement them (fundamentals and ui5). That‘s why luigi is using fundamentals for its built-in view components, like shellbar, modals, etc., to provide a zero-effort base for SAP solutions. External customers, if they don’t want to use Fiori design but e.g. bootstrap or material, have to do a little bit more, because they would need to re-style the luigi view components according to their design guidelines initially or completely replace them with their own components.

### The SAP UI frameworks Fundamentals and UI5 have a different purpose technically - what is that difference? How does Luigi work with them?

Fundamentals (plain) is a CSS library providing Fiori 3 styles to non-UI5 applications which is of course something completely different (you could compare it to twitter bootstrap). There are also “sub-projects” of fundamental, providing fully functional UI controls for angular, react and vue.js, which is also not what luigi does. OpenUI5 is a UI framework which provides a rich set of UI controls (Fiori style), so from a functional perspective it covers the same as “fundamental + X + fundamental X components”, where X is angular, react or vue.js.

Luigi core is using plain fundamental (so only css) for the ui elements it provides (shellbar, vertical navigation, modal windows, etc.), so there is a technical dependency.

However, you can use OpenUI5 to create your Luigi micro frontends, if that is your favorite Fiori 3 UI framework. Luigi is technology agnostic.

### Luigi claims to be ‘technology agnostic’. Are you referring to the UI framework that can be used, or to some other technology?

The main point is indeed that you can choose the base frontend technology you prefer, so ui5, angular, react, vue or whatever is the latest hot thing. And you can even mix them in one solution, so one micro frontend can use ui5 while another one is written in angular and fundamentals. The only thing matters is that at the end it is provided as html/javascript/css resources served via https. However, the fact that a micro frontend is an own web application also means that you have full freedom regarding your development toolchain and ci/cd solutions, or the webserver you want to use (nginx, apache, tomcat, github pages, etc.).

Last but not least technology agnostic also means that there are no conflicts regarding any additional library you use, so not only the base ui framework but think about e.g. various chart libraries like d3.js, chart.js, etc. Not only that there might be conflicts between different libs, the main problem are conflicts between different versions of the same library. Just imagine a monolithic web application where a lot of teams are contributing and there has been a decision that chart.js is the data visualization framework of choice and then there is a need for updating the version, which potentially has breaking changes. In that case all the teams have to be approached and asked if they use it, if their code is affected by the version update and, if so, when they can deliver the necessary changes. With Luigi you don‘t have this management overhead at all.

### Are there any non-SAP equivalents of Luigi?

In deed, there are several. Here are some of the most popular: https://www.mosaic9.org/, https://github.com/CanopyTax/single-spa, https://opencomponents.github.io/, https://www.piral.io. Note that they are not 100% equivalents of Luigi!!!

<!--
### In what way is Luigi different from these mentioned framework/products?

TBD
-->

### Is Luigi already being used within SAP, or is it still too new to end up in any shipped products?

Yes, it is already being used in production and close-to-production within and outside of SAP. Examples: KYMA, SAP C/4Hana Cockpit, Context driven services, SAAS AG (partner), Konduit, Varkes. Additionally, there are POCs going on with Field Service Management, Gigya, various products in SAP Commerce Cloud and others.
<!-- accordion:end -->
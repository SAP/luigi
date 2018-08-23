# Router Configuration

You can configure the way Luigi tackles routing in your application in the **Routing** section of the configuration file. In the example, you can choose the routing strategy to apply in your application as either hash or path location routing. Path location routing is the default strategy. You don't need to define the option if you prefer to use the path location routing strategy such as `https://myawesomeapp.test/projects/project2/users/groups`.

Set **useHashRouting** to `true` to enable hash location routing such as `https://myawesomeapp.test/#/projects/project2/users/groups`.

This is how the code looks when the option is set to `true`:

````
routing: {
  useHashRouting: true
}
````
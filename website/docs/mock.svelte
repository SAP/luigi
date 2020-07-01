<script>
  let name = 'world';
  let color = Math.floor(Math.random() * 100) < 50  ? 'red' : 'blue';
</script>

<h1 style='color:{color}' >Hello {name.toUpperCase()}!</h1>
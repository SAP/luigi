<script>
  let name = 'world';
  let color = Math.floor(Math.random() * 100) < 50  ? 'red' : 'blue';
</script>

Hello inside <h1 style='color:{color}' >imported component {name.toUpperCase()}!</h1> 
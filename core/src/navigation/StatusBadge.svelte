<script>
  export let node;
  const STATUS = ['negative', 'positive', 'critical', 'informative'];
  const statusType = node && node.statusBadge && node.statusBadge.type;
  const type = STATUS.includes(statusType) ? statusType : 'neutral';
</script>

{#if node.statusBadge && node.statusBadge.label !== ''}
  <span
    class="fd-object-status fd-object-status--{type} fd-object-status--inverted"
  >
    <span class="fd-object-status__text">{node.statusBadge.label}</span>
  </span>
{/if}

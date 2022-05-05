<template>
	<div
		class="absolute -bottom-64 lg:-bottom-20 flex flex-col lg:flex-row bg-white gap-y-4 gap-x-12 px-8 pt-8 pb-12 rounded-md"
	>
		<!-- Flex Item -->
		<div class="flex flex-col">
			<h3 class="text-xs uppercase">IP Address</h3>
			<span class="text-2-xl">{{ ipInfo.address }}</span>
		</div>

		<!-- Flex Item -->
		<div class="flex flex-col">
			<h3 class="text-xs uppercase">Location</h3>
			<span class="text-2-xl">{{ ipInfo.state }}</span>
		</div>

		<!-- Flex Item -->
		<div class="flex flex-col">
			<h3 class="text-xs uppercase">Timezone</h3>
			<span class="text-2-xl">UTC {{ ipInfo.timezone }} </span>
		</div>

		<!-- Flex Item -->
		<div class="flex flex-col">
			<h3 class="text-xs uppercase">ISP</h3>
			<span class="text-2-xl">{{ ipInfo.isp }}</span>
		</div>
		<!-- lat -->
		<div class="flex flex-col">
			<h3 class="text-xs uppercase">ISP</h3>
			<span class="text-2-xl">{{ ipInfo.isp }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['ipInfo'],
	}
</script>

<template>
	<div class="flex flex-col h-screen max-h-screen">
		<!-- Search -->
		<div class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32">
			<!-- search input -->
			<div class="w-full max-w-screen-sm">
				<h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
				<div class="flex">
					<input v-model="queryIp" type="text"
						placeholder="Search for any IP Address  OR  Leave it empty to get your IP information!!"
						class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none" />
					<i @click="getIpInfo"
						class="cursor-pointer bg-black text-white px-4 rounded-tr-md rounded-br-md flex items-center fa-solid fa-magnifying-glass-location"></i>
				</div>
			</div>
			<!-- ip info -->
			<IPInfo v-if="ipInfo" v-bind:ipInfo="ipInfo" />
		</div>

		<!-- Map -->
		<div id="mapid" class="h-full z-10" @click="onMapClick"></div>
	</div>
</template>

<script >
// @ is an alias to /src
import IPInfo from '../components/IPInfo.vue'
import leaflet from 'leaflet'
import { onMounted, ref } from 'vue'
import axios from 'axios'
export default {
	name: 'HomeView',
	components: { IPInfo },
	created() {
		const mapboxApiKey = process.env.VUE_APP_MAPBOX_API_KEY;
		console.log(mapboxApiKey)
	},
	setup() {
		let mymap
		//
		const queryIp = ref('')
		const ipInfo = ref(null)
		//
		onMounted(() => {
			mymap = leaflet.map('mapid').setView([-0.14, 37.908], 7)
			leaflet
				.tileLayer(
					'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlcmVhbGJvc3NiYWJ5IiwiYSI6ImNsMnN4bXBlcjAzN2wzY285ZXI0bjVkcTcifQ.EOn2pYDA3zoN9MwJE2IYYA',
					{
						attribution:
							'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
						maxZoom: 18,
						id: 'mapbox/streets-v11',
						tileSize: 512,
						zoomOffset: -1,
						accessToken:
							'pk.eyJ1IjoidGhlcmVhbGJvc3NiYWJ5IiwiYSI6ImNsMnN4bXBlcjAzN2wzY285ZXI0bjVkcTcifQ.EOn2pYDA3zoN9MwJE2IYYA',
					},
				)
				.addTo(mymap)
		})
		//get ip info from geo.ipify with axios
		const getIpInfo = async () => {
			try {
				const data = await axios.get(
					`https://geo.ipify.org/api/v2/country,city?apiKey=at_y8Dl4zXIs7eFerKlbS314qRbVJBqw&ipAddress=${queryIp.value}`,
				)
				const result = data.data
				ipInfo.value = {
					address: result.ip,
					state: result.location.region,
					timezone: result.location.timezone,
					isp: result.isp,
					lat: result.location.lat,
					lng: result.location.lng,
				}
				//show marker
				leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(mymap)
				//update map to show ip location
				mymap.setView([ipInfo.value.lat, ipInfo.value.lng], 13)
			} catch (err) {
				// console.log(ipInfo)
				alert(err.message)
			}
		}

		return { queryIp, ipInfo, getIpInfo }
	},
}
</script>

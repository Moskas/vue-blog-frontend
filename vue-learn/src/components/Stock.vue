<script setup>
import { watch, ref } from 'vue'
const coin = ref("monero")
const fiat = ref("pln")
const coinData = ref(null)

async function getCoinData() {
    coinData.value = null
    const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin.value}&vs_currencies=${fiat.value}`
    )
    coinData.value = await res.json()
}
getCoinData()
watch([coin, fiat], getCoinData)
</script>

<template>
    <main>
        <h3 v-if="!coinData">Loading...</h3>
        <h3 v-else>Monero: {{ coinData.monero.pln }}</h3>
    </main>
    <!--
    <div>
      <form @submit.prevent="getCryptoValue">
        <label for="coin">Select Coin:</label>
        <select v-model="selectedCoin" id="coin">
          <option v-for="(value, coin) in cryptoData" :key="coin" :value="coin">
            {{ coin }}
          </option>
        </select>
  
        <label for="fiatSymbol">Fiat Symbol:</label>
        <input v-model="fiatSymbol" type="text" id="fiatSymbol" />
  
        <button type="submit">Get Value</button>
      </form>
  
      <p v-if="selectedCoin && cryptoData[selectedCoin]">
        {{ selectedCoin }} price in {{ fiatSymbol }}: {{ cryptoData[selectedCoin][fiatSymbol.toLowerCase()] }}
      </p>
      <p v-else>Select a coin and enter a fiat symbol to get the value.</p>
    </div>
    -->
  </template>
  
  <script>
  export default {
    data() {
      return {
        cryptoData: {
          monero: {
            pln: 607.62
          },
          bitcoin: {
            pln: 100000.00
          },
          ethereum: {
            pln: 4000.50
          }
          // Add more currencies as needed
        },
        selectedCoin: '',
        fiatSymbol: ''
      };
    },
    methods: {
      getCryptoValue() {
        // Additional validation can be added here if needed
        if (this.selectedCoin && this.cryptoData[this.selectedCoin]) {
          console.log(`${this.selectedCoin} price in ${this.fiatSymbol}: ${this.cryptoData[this.selectedCoin][this.fiatSymbol.toLowerCase()]}`);
        }
      }
    }
  };
  </script>

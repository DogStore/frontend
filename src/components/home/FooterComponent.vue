<script setup lang="ts">
import { ref } from 'vue';
import CamFlag from '@/assets/FooterImages/Cambodia.png'
import FrenchFlag from '@/assets/FooterImages/France.png'
import AustraliaFlag from '@/assets/FooterImages/Australia.png'

interface Country {
  img: string;
  name: string;
}

// Country options
const countries: Country[] = [
  { img: CamFlag, name: 'Cambodia / Khmer' },
  { img: FrenchFlag, name: 'France' },
  { img: AustraliaFlag, name: 'Australia' }
];

// State for personalization form
const email = ref<string>('');
const dogName = ref<string>('');
const selectedCountry = ref<Country>({ img: CamFlag, name: 'Cambodia / Khmer' });
const isCountryDropdownOpen = ref<boolean>(false);

// Handle form submission
const handleGetPersonalized = (): void => {
  if (email.value && dogName.value) {
    console.log('Personalization request:', { email: email.value, dogName: dogName.value });
    // Reset form
    email.value = '';
    dogName.value = '';
  }
};

// Toggle country dropdown
const toggleCountryDropdown = (): void => {
  isCountryDropdownOpen.value = !isCountryDropdownOpen.value;
};

// Select country
const selectCountry = (country: Country): void => {
  selectedCountry.value = country;
  isCountryDropdownOpen.value = false;
};
</script>

<template>
  <footer class="w-full font-sans mt-[-10rem] bg-white lg:mt-[-180px]">

    <!-- PERSONALIZATION SECTION -->
    <div class="bg-orange-50 border-b border-gray-200 px-4 sm:px-6">
      <div class="mx-auto max-w-[1400px] py-6 md:py-8">
        <div class="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-30">
          <!-- Dog Image -->
          <div class="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <img
              src="@/assets/FooterImages/Golden Dog.png"
              alt="Dog"
              class="w-48 sm:w-56 md:w-64 lg:w-70 h-auto max-h-40 sm:max-h-48 md:max-h-52 lg:h-60">
          </div>

          <!-- Content -->
          <div class="flex-grow w-full lg:w-auto">
            <h3 class="text-lg sm:text-xl font-Nunito font-bold text-gray-800 mb-2 text-center lg:text-left">
              We pick products our own dogs love because every dog deserves the best.
            </h3>
            <p class="text-gray-600 text-sm mb-4 text-center lg:text-left">
              Want personalized suggestions? Just tell us your dog's name and your email, we'll send you perfect picks they'll adore!
            </p>

            <!-- Form -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-0">
              <input
                v-model="email"
                type="email"
                placeholder="Please enter your email"
                class="w-full sm:w-auto flex-grow px-4 py-2.5 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"/>
              <input
                v-model="dogName"
                type="text"
                placeholder="Please enter your dog's name"
                class="w-full sm:w-auto flex-grow px-4 py-2.5 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"/>
            </div>
            <div class="flex justify-start lg:justify-start">
              <button
                @click="handleGetPersonalized"
                class="px-6 py-2.5 mt-2 bg-orange-400 text-white font-Nunito rounded-md hover:bg-orange-500 transition whitespace-nowrap flex items-center gap-2">
                Get Personalized
                <img src="@/assets/FooterImages/Sent.png" alt="" class="h-6">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN FOOTER CONTENT -->
    <div class="mx-auto max-w-[1300px] px-4 sm:px-6 py-6 md:py-8 md:items-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <!-- Column 1: Customer Support & Help -->
        <div>
          <h4 class="text-base sm:text-lg font-Nunito font-bold text-gray-800 mb-3 md:mb-4">Customer Support & Help</h4>
          <ul class="space-y-1.5 md:space-y-2">
            <li v-for="(item, index) in [
              'My Account',
              'Help Center / FAQs',
              'Contact Us',
              'Shipping & Delivery Info',
              'Returns & Exchanges',
              'Track My Order']
              " :key="index">
                {{ item }}
            </li>
          </ul>
        </div>

        <!-- Column 2: Why Shop With Us -->
        <div>
          <h4 class="text-base sm:text-lg font-Nunito font-bold text-gray-800 mb-3 md:mb-4">Why Shop With Us?</h4>
          <ul class="space-y-1.5 md:space-y-2 whitespace-nowrap">

            <li v-for="(item, index) in [
              'Paw-Approved Quality Guarantee',
              'Free Shipping on Orders Over $50',
              '30-Day Happiness Guarantee (Returns)',
              'Subscribe & Save 10% on Regular Deliveries',
              'Join Our Pack: Get Exclusive Deals & Tips']" :key="index">
                {{ item }}
            </li>
          </ul>
        </div>

        <!-- Column 3: Shop Smart -->
        <div class="lg:ml-20">
          <h4 class="text-base sm:text-lg font-Nunito text-gray-800 font-bold mb-3 md:mb-4">
            Shop Smart
          </h4>
          <ul class="space-y-1.5 md:space-y-2.5">
            <li
              v-for="(item, index) in [
                'Best Selling Product',
                'New Arrivals',
                'Seasonal Specials']" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Column 4: Choose your country -->
        <div class="lg:ml-12">
          <h4 class="text-base sm:text-lg font-Nunito font-bold text-gray-800 mb-3 md:mb-4">Choose your country</h4>
          <div class="relative">
            <!-- Country Dropdown Button -->
            <button
              @click="toggleCountryDropdown"
              class="w-full sm:w-60 px-4 py-1 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white cursor-pointer text-left flex items-center justify-between"
              :class="{ 'bg-orange-50': isCountryDropdownOpen }">
              <span class="flex items-center gap-2">
                <img :src="selectedCountry.img" alt="" class="w-7 h-8" />
                <span class="truncate">{{ selectedCountry.name }}</span>
              </span>
              <p class="mb-0.5 ml-2 font-bold transform transition-transform duration-200"
                 :class="{ 'rotate-180': isCountryDropdownOpen }">⌵</p>
            </button>

            <!-- Country Dropdown Menu -->
            <div
              v-if="isCountryDropdownOpen"
              class="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 shadow-lg rounded-md z-50 divide-y divide-gray-200 max-h-60 overflow-y-auto">
              <button
                v-for="country in countries"
                :key="country.name"
                @click="selectCountry(country)"
                class="w-full px-4 py-1 text-sm text-left text-gray-800 hover:bg-orange-50 transition flex items-center gap-2"
                :class="{ 'bg-orange-200 hover:bg-orange-200': selectedCountry.name === country.name }">
                <img :src="country.img" alt="" class="w-7 h-8 flex-shrink-0" />
                <span class="truncate">{{ country.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTTOM FOOTER: Methods, Legal, Connect, Where -->
    <div class="w-full bg-gray-100 px-4 sm:px-6">
      <div class="mx-auto max-w-[1400px] py-8 md:py-12">

        <!-- SECURE SHOPPING SECTION -->
        <h1 class="text-xl sm:text-2xl font-Nunito text-gray-800 mb-6 md:mb-8 text-center font-bold">
          Secure Shopping & Trust Badges
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

          <!-- Methods of Payment -->
          <div class="order-1 md:order-1">
            <h5 class="text-base sm:text-lg font-Nunito text-gray-800 font-bold mb-3">Methods of Payment</h5>
            <div class="flex flex-wrap items-center gap-3">
              <img src="@/assets/FooterImages/visa.png" alt="Visa" class="h-6 sm:h-8" title="Visa">
              <img src="@/assets/FooterImages/master.png" alt="Mastercard" class="h-12 sm:h-18" title="Mastercard">
              <img src="@/assets/FooterImages/paypal.png" alt="PayPal" class="h-12 sm:h-18" title="PayPal">
              <img src="@/assets/FooterImages/bank.png" alt="Bank" class="h-12 sm:h-20 sm:ml-[5rem] lg:ml-[5rem]" title="Bank">
            </div>
          </div>

          <!-- Legal & Company Info -->
          <div class="order-3 lg:order-2">
            <h5 class="font-Nunito text-base sm:text-lg font-bold text-gray-800 mb-3">Legal & Company Info</h5>
            <ul class="space-y-1.5 md:space-y-2">
              <li v-for="(item, index) in [
                'About Us',
                'Careers',
                'Terms of Service',
                'Accessibility Statement',
                'Return Policy']
                " :key="index">

                  {{ item }}

              </li>
            </ul>
          </div>

          <!-- Connect with Us -->
          <div class="order-2 md:order-3 lg:order-3">
            <h5 class="text-base sm:text-lg font-bold font-Nunito text-gray-800 mb-4 md:mb-5">
              Connect with Us
            </h5>

            <!-- ICONS -->
            <div class="flex flex-wrap gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid lg:grid-cols-2">
              <a href="#" class="w-10 h-10 sm:w-13 sm:h-13 flex items-center justify-center hover:opacity-80 transition" title="Facebook">
                <img src="@/assets/FooterImages/F.png" alt="Facebook" class="w-full h-auto">
              </a>

              <a href="#" class="w-9 h-9 sm:w-11 sm:h-13 flex items-center justify-center hover:opacity-80 transition md:ml-[-7rem] lg:ml-[-5rem]" title="X">
                <img src="@/assets/FooterImages/X.png" alt="X" class="w-full h-auto">
              </a>

              <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition" title="Telegram">
                <img src="@/assets/FooterImages/Telegram.png" alt="Telegram" class="w-full h-auto">
              </a>

              <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition md:ml-[-7rem] lg:ml-[-5rem]" title="Instagram">
                <img src="@/assets/FooterImages/IG.png" alt="Instagram" class="w-full h-auto">
              </a>
            </div>
          </div>

          <!-- Where you can find us -->
          <div class="order-4">
            <h5 class="text-base sm:text-lg font-bold font-Nunito text-gray-800 mb-3">Where you can find us?</h5>
            <div class="aspect-video rounded-md border sm:aspect-[4/3] lg:aspect-[5/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7412542918564!2d104.89551077466827!3d11.570397488630816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517388680e15%3A0x63057e6682968f5!2sInstitute%20of%20Technology%20of%20Cambodia!5e0!3m2!1sen!2skh!4v1764683440599!5m2!1sen!2skh"
                class="w-full h-full border-0 rounded-md"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Google Maps Location">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

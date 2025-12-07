<script setup lang="ts">
import { ref } from 'vue';
import CamFlag from '@/assets/FooterImages/Cam.png'

interface Country {
  img: string;
  name: string;
}

// Country options
const countries: Country[] = [
  { img: CamFlag, name: 'Cambodia / Khmer' },
  { img: CamFlag, name: 'USA' },
  { img: CamFlag, name: 'UK' }
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
  <footer class="w-full font-sans bg-white mt-[-180px]">

    <!-- PERSONALIZATION SECTION -->
    <div class="bg-orange-50 border-b border-gray-200">
      <div class="container mx-auto py-6">
        <div class="flex items-center gap-30">
          <!-- Dog Image -->
          <div class="flex-shrink-0">
            <img src="@/assets/FooterImages/Golden Dog.png" alt="Dog" class="w-70 h-60">
          </div>

          <!-- Content -->
          <div class="flex-grow">
            <h3 class="text-xl font-Nunito font-bold text-gray-800 mb-2">
              We pick products our own dogs love because every dog deserves the best.
            </h3>
            <p class="text-gray-600 text-sm mb-4">
              Want personalized suggestions? Just tell us your dog's name and your email, we'll send you perfect picks they'll adore!
            </p>

            <!-- Form -->
            <div class="flex gap-5">
              <input
                v-model="email"
                type="email"
                placeholder="Please enter your email"
                class=" w-120  px-4 py-2.5 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <input
                v-model="dogName"
                type="text"
                placeholder="Please enter your dog's name"
                class="w-120 px-4 py-2.5 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
            <button
              @click="handleGetPersonalized" class="px-6 py-2.5 mt-2 bg-orange-400 text-white font-Nunito rounded-md hover:bg-orange-500 transition whitespace-nowrap flex items-center gap-2">
              Get Personalized<img src="@/assets/FooterImages/Sent.png" alt="" class="h-6">
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN FOOTER CONTENT -->
    <div class="container mx-auto px-4 py-8 border-gray-200">
      <div class="flex gap-30">

        <!-- Column 1: Customer Support & Help -->
        <div>
          <h4 class="text-lg font-Nunito font-bold text-gray-800 mb-4">Customer Support & Help</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                My Account
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Help Center / FAQs
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Shipping & Delivery Info
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Track My Order
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2: Why Shop With Us -->
        <div>
          <h4 class="text-lg font-Nunito font-bold text-gray-800 mb-4">Why Shop With Us?</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Paw-Approved Quality Guarantee
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Free Shipping on Orders Over $50
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                30-Day Happiness Guarantee (Returns)
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Subscribe & Save 10% on Regular Deliveries
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Join Our Pack: Get Exclusive Deals & Tips
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Shop Smart -->
        <div>
          <h4 class="text-lg font-Nunito text-gray-800 font-bold mb-4">Shop Smart</h4>
          <ul class="space-y-2.5">
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Best Selling Product
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                Seasonal Specials
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 4: Choose your country -->
        <div>
          <h4 class="text-lg font-Nunito font-bold text-gray-800 mb-4">Choose your country</h4>
          <div class="relative">
            <!-- Country Dropdown Button -->
            <button
              @click="toggleCountryDropdown"
              class="w-60 px-4 py-2.5 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white cursor-pointer text-left flex items-center justify-between"
              :class="{ 'bg-orange-50': isCountryDropdownOpen }">
              <span class="flex items-center gap-2">
                <img :src="selectedCountry.img" alt="" class="w-7 h-5 " />
                <span>{{ selectedCountry.name }}</span>
              </span>
              <p class="mb-0.5 ml-2 font-bold" :class="{ 'rotate-180': isCountryDropdownOpen }">⌵</p>
            </button>

            <!-- Country Dropdown Menu -->
            <div
              v-if="isCountryDropdownOpen"
              class="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-md z-50 divide-y divide-gray-200">
              <button
                v-for="country in countries"
                :key="country.name"
                @click="selectCountry(country)"
                class="w-full px-4 py-2.5 text-sm text-left text-gray-800 hover:bg-orange-50 transition flex items-center gap-2"
                :class="{ 'bg-orange-200 hover:bg-orange-200': selectedCountry.name === country.name }">
                <img :src="country.img" alt="" class="w-7 h-5 " />
                <span>{{ country.name }}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- BOTTOM FOOTER: Methods, Legal, Connect, Where -->
    <div class="w-full bg-gray-100">
      <div class="container mx-auto px-4 py-12">
        <!-- SECURE SHOPPING SECTION -->
        <h1 class="text-2xl font-Nunito text-gray-800 mb-8 text-center font-bold">
          Secure Shopping & Trust Badges
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

          <!-- Methods of Payment -->
          <div>
            <h5 class="text-lg font-Nunito text-gray-800 font-bold mb-3">Methods of Payment</h5>
            <div class="flex items-center gap-2">
              <img src="@/assets/FooterImages/visa.png" alt="Visa" class="h-8" title="Visa">
              <img src="@/assets/FooterImages/master.png" alt="Mastercard" class="h-18" title="Mastercard">
              <img src="@/assets/FooterImages/paypal.png" alt="PayPal" class="h-18" title="PayPal">
            </div>
            <img src="@/assets/FooterImages/bank.png" alt="PayPal" class="h-20 ml-16" title="PayPal">
          </div>

          <!-- Legal & Company Info -->
          <div>
            <h5 class="font-Nunito text-lg font-bold sans-serif text-gray-800 mb-3">Legal & Company Info</h5>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-700 hover:text-orange-500 transition text-sm">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          <!-- Connect with Us -->
          <div>
            <h5 class="text-lg font-bold font-Nunito text-gray-800 mb-5">Connect with Us</h5>
            <div class="flex gap-6 ml-3">
              <a href="#" class="mb-2 w-13 h-13 flex items-center justify-center hover:text-orange-500 transition" title="Facebook">
                <img src="@/assets/FooterImages/F.png" alt="Facebook" class="mb-1">
              </a>
              <a href="#" class="w-11 h-11 flex items-center justify-center hover:text-orange-500 transition" title="X">
                <img src="@/assets/FooterImages/X.png" alt="X">
              </a>
            </div>
            <div class="flex gap-6 ml-3.5">
              <a href="#" class="w-12 h-12 flex items-center justify-center hover:text-orange-500 transition" title="Telegram">
                <img src="@/assets/FooterImages/Telegram.png" alt="Telegram">
              </a>
              <a href="#" class="w-12 h-12 flex items-center justify-center hover:text-orange-500 transition" title="Instagram">
                <img src="@/assets/FooterImages/IG.png" alt="Instagram">
              </a>
            </div>
          </div>

          <!-- Where you can find us -->
          <div>
            <h5 class="text-lg font-bold font-Nunito text-gray-800 mb-3">Where you can find us?</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7412542918564!2d104.89551077466827!3d11.570397488630816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517388680e15%3A0x63057e6682968f5!2sInstitute%20of%20Technology%20of%20Cambodia!5e0!3m2!1sen!2skh!4v1764683440599!5m2!1sen!2skh"
              width="100%"
              height="200"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<template>
  <section class="bg-[#FFF6EC] py-[8.5rem] px-6 mt-[-13.5rem] border border-gray-300 font-Nunito">
    <div class="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">

      <!-- LEFT DOG -->
      <img
        :src="leftDog"
        alt="Happy dog"
        class="hidden lg:block h-[380px] ml-[-2rem] mb-[-8rem]"
      />

      <!-- CENTER CONTENT -->
      <div class="max-w-xl text-center lg:text-left mt-[-4rem] ml-0 lg:ml-[-5rem]">

        <h2 class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 whitespace-nowrap">
          Your Pup’s Favorite Picks!
        </h2>

        <p class="text-gray-600 text-base md:text-xl md:text-start text-start leading-relaxed mb-10 ">
          Here’s where all your saved items live — the toys, treats,
          and accessories your furry friend is dreaming about.
          <br /><br />
          Add items to your wish list to keep track of what you’d love to get next.
        </p>

        <div class="flex items-center justify-center lg:justify-start gap-4">
          <button
            @click="$emit('addNow')"
            class="bg-[#FFAA0C] text-white px-8 py-3 rounded-sm font-semibold
                   text-xl md:text-2xl lg:text-3xl
                   hover:bg-orange-500 transition flex items-center gap-3 shadow-md"
          >
            Add Now
            <img :src="fav" alt="Favorite" class="w-6 h-6" />
          </button>

          <img
            :src="Pawprint"
            alt="Paw"
            class="w-12 h-12 sm:w-14 sm:h-14 opacity-80"
          />
        </div>
      </div>

      <!-- RIGHT DOG -->
      <img
        :src="rightDog"
        alt="Cute puppy"
        class="hidden lg:block h-[380px] mr-[-3rem] mb-[-8rem]"
      />

    </div>
  </section>
</template>

<script setup lang="ts">
import fav from "@/assets/wishlist/Favorite.png";
import Pawprint from "@/assets/ShowcaseImages/Pawprint.png";

defineProps<{
  leftDog: string;
  rightDog: string;
}>();

defineEmits(["addNow"]);
</script>

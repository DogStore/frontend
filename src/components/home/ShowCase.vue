<template>
  <div class="bg-orange-50 border border-gray-300 py-9 -mt-54 sm:-mt-54 lg:py- lg:-mt-54">
    <div class="mx-auto max-w-[1700px] px-4 lg:px-10">
      <div
        class="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14 overflow-hidden"
      >
        <!-- DOG IMAGE -->
        <div class="shrink-0 w-full flex justify-center lg:block lg:w-100 lg:h-120 lg:-ml-4">
          <img :src="dogImage" :alt="title" class="w-[260px] sm:w-[340px] md:w-[420px] lg:w-auto" />
        </div>

        <!-- RIGHT CONTENT -->
        <div class="w-full lg:grow lg:0mt-16">
          <!-- DISCOUNT + TITLE -->
          <div class="flex flex-col items-center lg:flex-row lg:items-end gap-6 mb-4 mt-6 lg:mt-35">
            <!-- DISCOUNT -->
            <img
              src="@/assets/ShowcaseImages/discount.png"
              class="w-40 h-35 -mt-12 md:w-70 md:h-60 lg:h-50 lg:mb-15 lg:-ml-16 lg:-mt-40"
            />

            <!-- TITLE -->
            <h2
              v-html="title"
              class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-800 font-Nunito text-center lg:text-left lg:mt-5rem"
            ></h2>
          </div>

          <!-- DESCRIPTION -->
          <p
            class="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-[500px] text-center lg:text-justify mx-auto lg:mx-0 lg:ml-64 font-Nunito mb-6"
          >
            {{ description }}
          </p>

          <!-- BUTTON + PAW -->
          <div class="flex flex-col items-center mt-6 lg:-ml-152 lg:-mt-26">
            <router-link
              to="/products/bestSelling"
              class="inline-block px-8 py-3 bg-[#FFAA0C] text-white font-Nunito rounded-md text-xl sm:text-2xl hover:bg-orange-500 transition mb-4"
            >
              {{ buttonText }}
            </router-link>

            <div v-if="pawImage" class="w-10 h-10 sm:w-12 sm:h-12">
              <img :src="pawImage" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        <!-- BONES (DESKTOP ONLY) -->
        <div class="hidden lg:flex flex-col items-end -space-y-2.5 mt-10 pr-35">
          <img :src="boneImage" alt="bone" class="w-30 object-contain" />
          <img :src="boneImage" alt="bone" class="w-30 object-contain -mr-10" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  buttonText: string
  dogImage: string
  boneImage: string
  pawImage: string
}>()

defineEmits(['shopNow'])
</script>

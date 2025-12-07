<template>
  <div class=" p-6 space-y-4">
    <h2 class="text-xl font-semibold text-gray-800">Customer Information</h2>

    <!-- Name -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">Name*</label>
      <div class="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          class="border border-[#FFAA0C] focus:ring-1 focus:ring-[#FFAA0C] rounded-[10px] px-3 py-2 w-full outline-none placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Last Name"
          class="border border-[#FFAA0C] focus:ring-1 focus:ring-[#FFAA0C] rounded-[10px] px-3 py-2 w-full outline-none placeholder-gray-400"
        />
      </div>
    </div>

    <!-- Phone -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">Phone Number*</label>
      <div class="flex border border-orange-300 rounded-[10px] overflow-hidden">
        <span
          class="flex items-center justify-center bg-transparent px-4 border-r border-[#FFAA0C] text-gray-700 font-semibold"
        >
          +855
        </span>
        <input
          type="tel"
          placeholder="12 345 678"
          class="flex-1 px-3 py-2 outline-none placeholder-gray-400"
        />
      </div>
    </div>

    <!-- Address -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">Address*</label>
      <input
        type="text"
        placeholder="Paste your location URL here"
        class="border border-[#FFAA0C] focus:ring-1 focus:ring-[#FFAA0C] rounded-[10px] px-3 py-2 w-full outline-none placeholder-gray-400"
      />
    </div>

    <!-- Note -->
    <div>
      <label class="block font-medium text-gray-800 mb-1">Note:</label>
      <textarea
        placeholder="Text something to the deliverer"
        class="border border-[#FFAA0C] focus:ring-1 focus:ring-[#FFAA0C] rounded-[10px] px-3 py-2 w-full outline-none placeholder-gray-400 resize-none"
        rows="3"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticles, type Article } from '@/lib/markdown'
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import BorderBeam from '@/components/inspira/BorderBeam.vue'
import { Motion } from 'motion-v'
import { Calendar, Clock, Tag, ArrowRight, Loader2 } from 'lucide-vue-next'

const articles = ref<Article[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    articles.value = await getArticles()
  } catch (error) {
    console.error('Failed to load articles:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-20">
    <Motion
      as="div"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      class="mb-12 text-center"
    >
      <h1 class="text-4xl font-bold text-foreground md:text-5xl">技术文章</h1>
      <p class="mt-4 text-lg text-muted-foreground">
        分享我的技术见解和学习心得
      </p>
    </Motion>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <Loader2 class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <div v-else class="space-y-8">
      <Motion
        v-for="(article, index) in articles"
        :key="article.id"
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: index * 0.1, duration: 0.5 }"
      >
        <router-link :to="`/articles/${article.id}`" class="group block">
          <CardSpotlight
            class="p-6 transition-all hover:scale-[1.02]"
            gradient-color="#262626"
            :gradient-opacity="0.3"
          >
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-4 text-sm text-muted-foreground">
                <span class="flex items-center gap-1">
                  <Calendar class="h-4 w-4" />
                  {{ article.date }}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="h-4 w-4" />
                  {{ article.readTime }}
                </span>
              </div>

              <h2 class="text-2xl font-bold text-foreground">
                {{ article.title }}
              </h2>

              <p class="text-muted-foreground">
                {{ article.description }}
              </p>

              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in article.tags"
                    :key="tag"
                    class="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    <Tag class="h-3 w-3" />
                    {{ tag }}
                  </span>
                </div>

                <span
                  class="flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary"
                >
                  阅读全文
                  <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            <BorderBeam :size="200" :duration="15000" :delay="index * 2000" />
          </CardSpotlight>
        </router-link>
      </Motion>
    </div>

    <Motion
      v-if="!loading && articles.length === 0"
      as="div"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      class="py-20 text-center text-muted-foreground"
    >
      暂无文章
    </Motion>
  </div>
</template>
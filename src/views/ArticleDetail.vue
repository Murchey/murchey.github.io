<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleById, type Article } from '@/lib/markdown'
import { Motion } from 'motion-v'
import { Calendar, Clock, Tag, ArrowLeft, ExternalLink, Loader2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const article = ref<Article | null>(null)
const loading = ref(true)

const articleId = computed(() => route.params.id as string)

onMounted(async () => {
  try {
    const found = await getArticleById(articleId.value)
    if (found) {
      article.value = found
    }
  } catch (error) {
    console.error('Failed to load article:', error)
  } finally {
    loading.value = false
  }
})

function goBack() {
  router.push('/articles')
}
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-20">
    <div v-if="loading" class="flex items-center justify-center py-20">
      <Loader2 class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <Motion
      v-else-if="article"
      as="div"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
    >
      <button
        class="mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        @click="goBack"
      >
        <ArrowLeft class="h-4 w-4" />
        返回文章列表
      </button>

      <article class="prose prose-lg dark:prose-invert max-w-none">
        <header class="mb-12">
          <h1 class="mb-4 text-4xl font-bold text-foreground">{{ article.title }}</h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span class="flex items-center gap-1">
              <Calendar class="h-4 w-4" />
              {{ article.date }}
            </span>
            <span class="flex items-center gap-1">
              <Clock class="h-4 w-4" />
              {{ article.readTime }}
            </span>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              <Tag class="h-3 w-3" />
              {{ tag }}
            </span>
          </div>
        </header>

        <div
          class="article-content"
          v-html="article.html"
        />

        <footer class="mt-12 border-t border-border pt-8">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted-foreground">
              感谢阅读，欢迎交流讨论
            </p>
            <a
              :href="`https://github.com/Murchey/${articleId}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink class="h-4 w-4" />
              查看项目
            </a>
          </div>
        </footer>
      </article>
    </Motion>

    <Motion
      v-else
      as="div"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      class="py-20 text-center"
    >
      <h2 class="text-2xl font-bold text-foreground">文章未找到</h2>
      <p class="mt-4 text-muted-foreground">抱歉，您访问的文章不存在</p>
      <button
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
        @click="goBack"
      >
        <ArrowLeft class="h-4 w-4" />
        返回文章列表
      </button>
    </Motion>
  </div>
</template>

<style scoped>
.article-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(var(--foreground));
}

.article-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.article-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.8;
  color: hsl(var(--muted-foreground));
}

.article-content :deep(strong) {
  font-weight: 600;
  color: hsl(var(--foreground));
}

.article-content :deep(code) {
  background: hsl(var(--muted));
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
  color: hsl(var(--muted-foreground));
}

.article-content :deep(li)::before {
  content: '•';
  position: absolute;
  left: 0;
  color: hsl(var(--primary));
}

.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.875rem;
}

.article-content :deep(td) {
  padding: 0.75rem;
  border: 1px solid hsl(var(--border));
  color: hsl(var(--muted-foreground));
}

.article-content :deep(tr:nth-child(even)) {
  background: hsl(var(--muted));
}
</style>
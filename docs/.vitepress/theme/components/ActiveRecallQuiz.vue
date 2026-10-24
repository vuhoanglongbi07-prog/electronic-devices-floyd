<script setup lang="ts">
import { ref } from 'vue'

export interface QuizQuestion {
  q: string
  options: string[]
  correctIndex: number
  explanation: string
}

const props = defineProps<{
  title?: string
  questions: QuizQuestion[]
}>()

const selectedAnswers = ref<Record<number, number>>({})
const revealed = ref<Record<number, boolean>>({})

function selectOption(qIdx: number, optIdx: number) {
  selectedAnswers.value[qIdx] = optIdx
  revealed.value[qIdx] = true
}

function resetQuiz() {
  selectedAnswers.value = {}
  revealed.value = {}
}

// Automatically format subscript/superscript notation like V_BIAS, 10^16, cm^-3, r'_d into clean textbook HTML
function formatMathHtml(text: string): string {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Superscripts like 10^-3, cm^-3, 10^18, n^2
    .replace(/\^(\-?\d+)/g, '<sup>$1</sup>')
    // Primed variables with subscript like r'_d, r'_e
    .replace(/\b([a-zA-Z])'_([a-zA-Z0-9()+\-]+)\b/g, '<i>$1\'</i><sub>$2</sub>')
    // Greek letters with subscript like β_DC, α_DC, α_T, τ_p
    .replace(/(β|α|τ|μ|ε|Δ)_([a-zA-Z0-9()+\-]+)/g, '<i>$1</i><sub>$2</sub>')
    // Standard variables with subscript like V_BIAS, R_LIMIT, V_p(sec), I_C(sat), n_i, p_p0
    .replace(/\b([A-Za-z]{1,2})_([a-zA-Z0-9()+,\-]+)\b/g, '<i>$1</i><sub>$2</sub>')
}
</script>

<template>
  <div class="sim-card">
    <div class="quiz-header">
      <h4 style="margin: 0;">🧠 {{ title || 'Kiểm Tra Phản Xạ Nhanh (Active Recall & Self-Test)' }}</h4>
      <button class="reset-btn" @click="resetQuiz">Làm lại</button>
    </div>

    <div class="q-list">
      <div v-for="(item, qIdx) in questions" :key="qIdx" class="q-card">
        <div class="q-text">
          <strong>Câu {{ qIdx + 1 }}:</strong>
          <span v-html="' ' + formatMathHtml(item.q)"></span>
        </div>
        <div class="opt-grid">
          <button
            v-for="(opt, optIdx) in item.options"
            :key="optIdx"
            class="opt-btn"
            :class="{
              correct: revealed[qIdx] && optIdx === item.correctIndex,
              wrong: revealed[qIdx] && selectedAnswers[qIdx] === optIdx && optIdx !== item.correctIndex
            }"
            @click="selectOption(qIdx, optIdx)"
            v-html="formatMathHtml(opt)"
          ></button>
        </div>
        <div v-if="revealed[qIdx]" class="exp-box" :class="{ ok: selectedAnswers[qIdx] === item.correctIndex }">
          <strong>{{ selectedAnswers[qIdx] === item.correctIndex ? '✅ Chính xác!' : '❌ Chưa đúng!' }}</strong>
          <span v-html="' ' + formatMathHtml(item.explanation)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.reset-btn {
  padding: 4px 10px;
  font-size: 0.78rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}
.q-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.q-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 14px;
}
.q-text {
  font-size: 0.92rem;
  margin-bottom: 10px;
  line-height: 1.55;
}
.opt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 8px;
}
.opt-btn {
  text-align: left;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.84rem;
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1.45;
}
.opt-btn:hover {
  border-color: var(--vp-c-brand-1);
}
.opt-btn.correct {
  background: rgba(16, 185, 129, 0.18);
  border-color: #10b981;
  font-weight: 700;
}
.opt-btn.wrong {
  background: rgba(239, 68, 68, 0.18);
  border-color: #ef4444;
}
.exp-box {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.83rem;
  background: rgba(239, 68, 68, 0.1);
  border-left: 3px solid #ef4444;
  line-height: 1.5;
}
.exp-box.ok {
  background: rgba(16, 185, 129, 0.1);
  border-left-color: #10b981;
}
</style>

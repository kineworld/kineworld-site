export const pillars = [
 {zh:'世界模型',en:'World Models',descZh:'学习环境如何随时间和动作变化。',descEn:'Model how environments change over time and in response to actions.'},
 {zh:'状态表征',en:'Representation Learning',descZh:'从观测中提取可用于预测和行动的状态。',descEn:'Extract states from observations that support prediction and action.'},
 {zh:'动作条件预测',en:'Action-conditioned Prediction',descZh:'研究不同动作可能引发的后续变化。',descEn:'Study how possible outcomes depend on the chosen action.'},
 {zh:'空间理解',en:'Spatial Understanding',descZh:'建立关于位置、结构与关系的可用表示。',descEn:'Build useful representations of position, structure and relationships.'},
 {zh:'因果与动力学',en:'Causality & Dynamics',descZh:'区分共现、变化与动作后果，保持可检验的边界。',descEn:'Distinguish co-occurrence, change and consequences while keeping claims testable.'},
 {zh:'规划与控制',en:'Planning & Control',descZh:'探索如何用预测支持目标导向的行动选择。',descEn:'Explore how predictions can inform goal-directed action selection.'}
] as const;
export const loopZh=['观测','状态表征','动作条件预测','未来推演','规划','行动','反馈'];
export const loopEn=['Observation','Representation','Action-conditioned prediction','Future rollout','Planning','Action','Feedback'];

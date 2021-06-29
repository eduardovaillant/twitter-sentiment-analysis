export interface MatchingRule {
  id: string
  tag: string
}

export interface TweetModel {
  id: string
  text: string
  matching_rules: MatchingRule[]
}

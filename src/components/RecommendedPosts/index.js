import Link from 'next/link'

import * as S from './styled'

const RecommendedPosts = ({ next, previous }) => (
  <S.RecommendedWrapper>
    {previous && (
      <Link href={previous.fields.slug} passHref>
        <S.RecommendedLink>{previous.frontmatter.title}</S.RecommendedLink>
      </Link>
    )}
    {next && (
      <Link href={next.fields.slug} passHref>
        <S.RecommendedLink>{next.frontmatter.title}</S.RecommendedLink>
      </Link>
    )}
  </S.RecommendedWrapper>
)

export default RecommendedPosts

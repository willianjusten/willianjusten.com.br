import Link from 'next/link'

import * as S from './styled'

const RecommendedPosts = ({ next, previous }) => (
  <S.RecommendedWrapper>
    {previous && (
      <Link href={previous.slug} passHref>
        <S.RecommendedLink className="previous">
          {previous.frontmatter.title}
        </S.RecommendedLink>
      </Link>
    )}
    {next && (
      <Link href={next.slug} passHref>
        <S.RecommendedLink className="next">
          {next.frontmatter.title}
        </S.RecommendedLink>
      </Link>
    )}
  </S.RecommendedWrapper>
)

export default RecommendedPosts

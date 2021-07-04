import Link from 'next/link'

import * as S from './styled'

const Pagination = props => (
  <S.PaginationWrapper>
    {!props.isFirst && (
      <Link href={props.prevPage}>
        <a>← Página Anterior</a>
      </Link>
    )}
    <p>
      {props.currentPage} de {props.numPages}
    </p>
    {!props.isLast && (
      <Link href={props.nextPage}>
        <a>Próxima Página →</a>
      </Link>
    )}
  </S.PaginationWrapper>
)

export default Pagination

import * as S from "./styled";
import { useState, type FC } from "react";

export const Navigation: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <S.NavigationStyled>
            <S.NavigationListWrapper $isOpen={isOpen}>
                <S.NavigationList>
                </S.NavigationList>
            </S.NavigationListWrapper>
        </S.NavigationStyled>
    );
};

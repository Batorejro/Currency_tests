import { render } from '@testing-library/react';
import ResultBox from './ResultBox';



describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
});
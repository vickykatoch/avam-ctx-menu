import { IPriceLevel } from '../models/model';

export interface TransformedPrice {
    price1: string;
    price2: string;
    price3: string;
}
export interface ITransformedPriceLevel {
    priceLevel: IPriceLevel;
    bid: TransformedPrice;
    ask: TransformedPrice;
}

class PriceTransformer {
    private transformedPriceMap = new Map<number, TransformedPrice>();
    private emptyTransformedPrice: TransformedPrice = {
        price1: '',
        price2: '--',
        price3: ''
    };

    public transform(priceLevel: IPriceLevel, tickSize: number): ITransformedPriceLevel {
        const transformedPriceLevel: ITransformedPriceLevel = {
            priceLevel,
            bid: this.emptyTransformedPrice,
            ask: this.emptyTransformedPrice
          };
          if (priceLevel.bid) {
              transformedPriceLevel.bid = this.transformPrice(priceLevel.bid, tickSize);
          }
          if (priceLevel.ask) {
              transformedPriceLevel.ask = this.transformPrice(priceLevel.ask, tickSize);
          }
        return transformedPriceLevel;
    }
    public get emptyPriceLevel(): ITransformedPriceLevel {
        return { ...this.emptyPriceLevel };
    }
    private transformPrice(price: number, tickSize: number): TransformedPrice {
        if (this.transformedPriceMap.has(price)) {
            return this.transformedPriceMap.get(price);
        } else {
            const priceString = price.toFixed(tickSize);
            const preDecPrice = priceString.slice(0, priceString.indexOf('.') + 1);
            const postDecPrice = priceString.slice(priceString.indexOf('.') + 1);
            switch (tickSize) {
                case 5:
                    return {
                        price1: `${preDecPrice}${postDecPrice.slice(0, 2)}`,
                        price2: postDecPrice.slice(2, 4),
                        price3: postDecPrice.slice(4)
                    };
                case 4:
                    return {
                        price1: `${preDecPrice}${postDecPrice.slice(0, 2)}`,
                        price2: postDecPrice.slice(2),
                        price3: ''
                    };
                case 2:
                    return {
                        price1: preDecPrice,
                        price2: postDecPrice,
                        price3: ''
                    };
                default:
                    return { ...this.emptyTransformedPrice, price1: price.toFixed(tickSize)};
            }
        }
    }
}

export default new PriceTransformer();

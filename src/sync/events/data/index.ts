import { Interface } from "@ethersproject/abi";

import * as erc721 from "@/events-sync/data/erc721";
import * as erc1155 from "@/events-sync/data/erc1155";
import * as weth from "@/events-sync/data/weth";

import * as cryptoPunks from "@/events-sync/data/cryptopunks";
import * as element from "@/events-sync/data/element";
import * as foundation from "@/events-sync/data/foundation";
import * as looksRare from "@/events-sync/data/looks-rare";
import * as nftx from "@/events-sync/data/nftx";
import * as nouns from "@/events-sync/data/nouns";
import * as quixotic from "@/events-sync/data/quixotic";
import * as rarible from "@/events-sync/data/rarible";
import * as seaport from "@/events-sync/data/seaport";
import * as sudoswap from "@/events-sync/data/sudoswap";
import * as universe from "@/events-sync/data/universe";
import * as wyvernV2 from "@/events-sync/data/wyvern-v2";
import * as wyvernV23 from "@/events-sync/data/wyvern-v2.3";
import * as x2y2 from "@/events-sync/data/x2y2";
import * as zeroExV4 from "@/events-sync/data/zeroex-v4";
import * as zora from "@/events-sync/data/zora";

// All events we're syncing should have an associated `EventData`
// entry which dictates the way the event will be parsed and then
// handled (eg. persisted to the database and relayed for further
// processing to any job queues).

export type EventDataKind =
  | "erc721-transfer"
  | "erc1155-transfer-single"
  | "erc1155-transfer-batch"
  | "erc721/1155-approval-for-all"
  | "erc20-approval"
  | "erc20-transfer"
  | "weth-deposit"
  | "weth-withdrawal"
  | "wyvern-v2-orders-matched"
  | "wyvern-v2.3-orders-matched"
  | "looks-rare-cancel-all-orders"
  | "looks-rare-cancel-multiple-orders"
  | "looks-rare-taker-ask"
  | "looks-rare-taker-bid"
  | "zeroex-v4-erc721-order-cancelled"
  | "zeroex-v4-erc1155-order-cancelled"
  | "zeroex-v4-erc721-order-filled"
  | "zeroex-v4-erc1155-order-filled"
  | "foundation-buy-price-set"
  | "foundation-buy-price-invalidated"
  | "foundation-buy-price-cancelled"
  | "foundation-buy-price-accepted"
  | "x2y2-order-cancelled"
  | "x2y2-order-inventory"
  | "seaport-order-cancelled"
  | "seaport-order-filled"
  | "seaport-counter-incremented"
  | "rarible-match"
  | "element-erc721-sell-order-filled"
  | "element-erc721-buy-order-filled"
  | "element-erc1155-sell-order-filled"
  | "element-erc1155-buy-order-filled"
  | "quixotic-order-filled"
  | "zora-ask-filled"
  | "zora-ask-created"
  | "zora-ask-price-updated"
  | "zora-ask-cancelled"
  | "zora-auction-ended"
  | "nouns-auction-settled"
  | "cryptopunks-punk-offered"
  | "cryptopunks-punk-no-longer-for-sale"
  | "cryptopunks-punk-bought"
  | "cryptopunks-punk-transfer"
  | "cryptopunks-assign"
  | "cryptopunks-transfer"
  | "sudoswap-buy"
  | "sudoswap-sell"
  | "sudoswap-token-deposit"
  | "sudoswap-token-withdrawal"
  | "universe-match"
  | "universe-cancel"
  | "nftx-redeemed"
  | "nftx-minted";

export type EventData = {
  kind: EventDataKind;
  addresses?: { [address: string]: boolean };
  topic: string;
  numTopics: number;
  abi: Interface;
};

export const getEventData = (eventDataKinds?: EventDataKind[]) => {
  if (!eventDataKinds) {
    return [
      erc721.transfer,
      erc721.approvalForAll,
      erc1155.transferSingle,
      erc1155.transferBatch,
      weth.approval,
      weth.transfer,
      weth.deposit,
      weth.withdrawal,
      foundation.buyPriceAccepted,
      foundation.buyPriceCancelled,
      foundation.buyPriceInvalidated,
      foundation.buyPriceSet,
      looksRare.cancelAllOrders,
      looksRare.cancelMultipleOrders,
      looksRare.takerAsk,
      looksRare.takerBid,
      seaport.counterIncremented,
      seaport.orderCancelled,
      seaport.orderFulfilled,
      wyvernV2.ordersMatched,
      wyvernV23.ordersMatched,
      zeroExV4.erc721OrderCancelled,
      zeroExV4.erc1155OrderCancelled,
      zeroExV4.erc721OrderFilled,
      zeroExV4.erc1155OrderFilled,
      x2y2.orderCancelled,
      x2y2.orderInventory,
      rarible.match,
      element.erc721BuyOrderFilled,
      element.erc721SellOrderFilled,
      element.erc1155BuyOrderFilled,
      element.erc1155SellOrderFilled,
      quixotic.orderFulfilled,
      zora.askFilled,
      zora.askCreated,
      zora.askCancelled,
      zora.askPriceUpdated,
      zora.auctionEnded,
      nouns.auctionSettled,
      cryptoPunks.punkOffered,
      cryptoPunks.punkNoLongerForSale,
      cryptoPunks.punkBought,
      cryptoPunks.punkTransfer,
      cryptoPunks.assign,
      cryptoPunks.transfer,
      sudoswap.buy,
      sudoswap.sell,
      sudoswap.tokenDeposit,
      sudoswap.tokenWithdrawal,
      universe.match,
      universe.cancel,
      nftx.minted,
      nftx.redeemed,
    ];
  } else {
    return (
      eventDataKinds
        .map(internalGetEventData)
        .filter(Boolean)
        // Force TS to remove `undefined`
        .map((x) => x!)
    );
  }
};

const internalGetEventData = (kind: EventDataKind): EventData | undefined => {
  switch (kind) {
    case "erc721-transfer":
      return erc721.transfer;
    case "erc721/1155-approval-for-all":
      return erc721.approvalForAll;
    case "erc1155-transfer-batch":
      return erc1155.transferBatch;
    case "erc1155-transfer-single":
      return erc1155.transferSingle;
    case "erc20-approval":
      return weth.approval;
    case "erc20-transfer":
      return weth.transfer;
    case "weth-deposit":
      return weth.deposit;
    case "weth-withdrawal":
      return weth.withdrawal;
    case "foundation-buy-price-accepted":
      return foundation.buyPriceAccepted;
    case "foundation-buy-price-cancelled":
      return foundation.buyPriceCancelled;
    case "foundation-buy-price-invalidated":
      return foundation.buyPriceInvalidated;
    case "foundation-buy-price-set":
      return foundation.buyPriceSet;
    case "wyvern-v2-orders-matched":
      return wyvernV2.ordersMatched;
    case "wyvern-v2.3-orders-matched":
      return wyvernV23.ordersMatched;
    case "looks-rare-cancel-all-orders":
      return looksRare.cancelAllOrders;
    case "looks-rare-cancel-multiple-orders":
      return looksRare.cancelMultipleOrders;
    case "looks-rare-taker-ask":
      return looksRare.takerAsk;
    case "looks-rare-taker-bid":
      return looksRare.takerBid;
    case "zeroex-v4-erc721-order-cancelled":
      return zeroExV4.erc721OrderCancelled;
    case "zeroex-v4-erc1155-order-cancelled":
      return zeroExV4.erc1155OrderCancelled;
    case "zeroex-v4-erc721-order-filled":
      return zeroExV4.erc721OrderFilled;
    case "zeroex-v4-erc1155-order-filled":
      return zeroExV4.erc1155OrderFilled;
    case "x2y2-order-cancelled":
      return x2y2.orderCancelled;
    case "x2y2-order-inventory":
      return x2y2.orderInventory;
    case "seaport-counter-incremented":
      return seaport.counterIncremented;
    case "seaport-order-cancelled":
      return seaport.orderCancelled;
    case "seaport-order-filled":
      return seaport.orderFulfilled;
    case "rarible-match":
      return rarible.match;
    case "element-erc721-sell-order-filled":
      return element.erc721SellOrderFilled;
    case "element-erc721-buy-order-filled":
      return element.erc721BuyOrderFilled;
    case "element-erc1155-sell-order-filled":
      return element.erc1155SellOrderFilled;
    case "element-erc1155-buy-order-filled":
      return element.erc1155BuyOrderFilled;
    case "quixotic-order-filled":
      return quixotic.orderFulfilled;
    case "zora-ask-filled":
      return zora.askFilled;
    case "zora-ask-created":
      return zora.askCreated;
    case "zora-ask-cancelled":
      return zora.askCancelled;
    case "zora-ask-price-updated":
      return zora.askPriceUpdated;
    case "zora-auction-ended":
      return zora.auctionEnded;
    case "nouns-auction-settled":
      return nouns.auctionSettled;
    case "cryptopunks-punk-offered":
      return cryptoPunks.punkOffered;
    case "cryptopunks-punk-no-longer-for-sale":
      return cryptoPunks.punkNoLongerForSale;
    case "cryptopunks-punk-bought":
      return cryptoPunks.punkBought;
    case "cryptopunks-punk-transfer":
      return cryptoPunks.punkTransfer;
    case "cryptopunks-assign":
      return cryptoPunks.assign;
    case "cryptopunks-transfer":
      return cryptoPunks.transfer;
    case "sudoswap-buy":
      return sudoswap.buy;
    case "sudoswap-sell":
      return sudoswap.sell;
    case "sudoswap-token-deposit":
      return sudoswap.tokenDeposit;
    case "sudoswap-token-withdrawal":
      return sudoswap.tokenWithdrawal;
    case "universe-match":
      return universe.match;
    case "universe-cancel":
      return universe.cancel;
    case "nftx-minted":
      return nftx.minted;
    case "nftx-redeemed":
      return nftx.redeemed;
    default:
      return undefined;
  }
};

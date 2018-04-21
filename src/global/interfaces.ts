export interface Map<T> {
    [key: string]: T;
}


export interface Follower {
    peerId: string,
    proof: string
}

export interface ListingCard {
    data: Listing,
    relationships: Relationships,
    type: string
}

export interface Relationships {
    moderators: Array<string>,
    vendor: vendorWrap,
}

// silly
export interface vendorWrap {
    data: Profile,
}

export interface ProfileSocial {
    type: string,
    username: string,
    proof: string
}

export interface ProfileContactInfo {
    website: string,
    email: string,
    social: ProfileSocial
}

export interface Profile {
    avatarHashes: Thumbnails,
    about: string,
    headerHashes: Thumbnails,
    averageRating: number,
    contactInfo: ProfileContactInfo,
    location: string,
    moderator: boolean,
    moderatorInfo: ProfileModeratorInfo,
    shortDescription: string,
    name: string,
    peerID: string,
    nsfw: boolean,
    vendor: boolean,
}

export interface ProfileModeratorInfoFee {
    fixedFee: Price,
    percentage: number,
    feeType: string
}

export interface ProfileModeratorInfo {
    description: string,
    languages: Array<string>,
    acceptedCurrencies: Array<string>,
    fee: ProfileModeratorInfoFee
}

export interface Listing {
    title: string,
    slug: string,
    description: string,
    averageRating: number,
    ratingCount: number,
    contractType: number,
    nsfw: boolean,
    thumbnail: Thumbnails,
    price: Price
}

export interface ListingDetailCoupon{
    title: string,
    hash: string,
    percentDiscount: string

}

export interface ListingDetailShippingOptionService{
    name: string
    price: number,
    estimatedDelivery: string,
    additionalItemPrice: number
}

export interface ListingDetailShippingOption{
    name: string
    type: string,
    regions: Array<string>,
    services: Array<ListingDetailShippingOptionService>
}

export interface ListingDetailOptionVariant{
    name: string,
}

export interface ListingDetailOption{
    name: string,
    variants: Array<ListingDetailOptionVariant>,
}

export interface ListingDetailSku{
    variantCombo: Array<number>,
}


export interface ListingDetailItem{
    title: string,
    description: string,
    price: number,
    tags: Array<string>,
    images: Array<Thumbnails>,
    categories: Array<string>,
    condition: string,
    options: Array<ListingDetailOption>,
    skus: Array<ListingDetailSku>,
}

export interface ListingDetailMetadata{
    version: number,
    contractType: string,
    format: string,
    expiry: Date,
    acceptedCurrencies: Array<string>,
    pricingCurrency: string,
    escrowTimeoutHours: number
}
export interface ListingFull {
    slug: string,
    vendorID: peerID,
    metadata: ListingDetailMetadata,
    item: ListingDetailItem,
    shippingOptions: Array<ListingDetailShippingOption>,
    coupons: Array<ListingDetailCoupon>,
    moderators: Array<string>,
    termsAndConditions: string,
    refundPolicy: string
}

export interface ListingFile {
    signature: string,
    listing: ListingFull
}

export interface PubKeys {
    identity: string,
    bitcoin: string,
}

export interface RatingDataVendorMetadata {
    listingSlug: string,
    ratingKey: string,
    listingTitle: string,
    thumbnail: Thumbnails
}

export interface RatingDataVendorSig {
    metadata: RatingDataVendorMetadata,
    signature: string
}

export interface peerID {
    peerID: string,
    pubkeys: PubKeys,
    bitcoinSig: string
}

export interface RatingData {
    buyerID: peerID,
    vendorID: peerID,
    buyerName: string,
    buyerSig: string,
    timestamp: Date;
    overall: number,
    description: number,
    quality: number,
    deliverySpeed: number,
    customerService: number,
    review: string
}

export interface RatingDetail {
    signature: string,
    ratingData: RatingData
}

export interface Rating {
    slug: string,
    count: number,
    average: number,
    timestamp: Date,
    ratings: Array<string>,
}

export interface Price {
    currencyCode: string,
    amount: number
}

export interface Thumbnails {
    tiny: string,
    small: string,
    medium: string,
    large: string,
    original: string,
    filename: string
}
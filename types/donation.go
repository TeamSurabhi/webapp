package types

type DonateInfo struct {
	Name   string  `json:"name"`
	Email  string  `json:"email"`
	Amount float64 `json:"amount"`
}
